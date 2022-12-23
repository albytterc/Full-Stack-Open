import { useEffect, useState } from "react";
import Services from "./Services";
import Notification from "./components/Notification";
import "./styles.css";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [searchResults, setNewSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    Services
      .getAllPersons()
      .then((data) => setPersons(data))
      .catch((err) => setErrorMessage(err.message + ": Unable to get contact list"));


  }, []);

  const addContact = (event) => {
    event.preventDefault();
    // persons.filter((person) => person.name === newName)
    for (const person of persons) {
      if (person.name === newName) {
        updateContact(person.id, person.name, newNumber);
        return;
      }
    }
    Services
      .addPerson(newName, newNumber)
      .then((data) => setPersons(persons.concat(data)))
      .then(() => setSuccessMessage(`Added ${newName} to phonebook`))
      .catch((err) => setErrorMessage(`Unable to add ${newName} to phonebook`))
      .finally(() => {
        setTimeout(() => setErrorMessage(null), 5000);
        setTimeout(() => setSuccessMessage(null), 5000);

      });
  };

  const deleteContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const deleteConfirmed = window.confirm(`Are you sure you want to delete ${personToDelete.name}?`);
    if (deleteConfirmed) {
      Services
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .then(() => setSuccessMessage(`Removed ${personToDelete.name} from phonebook`))
        .catch((err) => setErrorMessage(`Unable to remove ${personToDelete.name} from phonebook`))
        .finally(() => {
          setTimeout(() => setErrorMessage(null), 5000);
          setTimeout(() => setSuccessMessage(null), 5000);

        });
    }
  };

  const updateContact = (id, name, number) => {
    const updateConfirmed = window.confirm(`${name} already exists. Would you like to update their number to ${number}?`);
    if (updateConfirmed) {
      Services
        .updatePersonNumber(id, name, number)
        .then((data) => setPersons(persons.map((person) => person.id === id ? data : person)))
        .then(() => setSuccessMessage(`Updated ${name}'s phone number to ${number}`))
        .catch((err) => setErrorMessage(`Unable to update ${name}'s phone number to ${number}`))
        .finally(() => {
          setTimeout(() => setErrorMessage(null), 5000);
          setTimeout(() => setSuccessMessage(null), 5000);

        });
    }
  };


  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const results = persons.filter((person) => person.name?.toLowerCase().includes(query));
    setNewSearchResults(results);
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification className={errorMessage ? "error" : "success"} message={errorMessage || successMessage}/>
      <PersonForm addContact={addContact} newName={newName} handleName={handleName} newNumber={newNumber}
                  handleNumber={handleNumber}/>
      <h2>Contacts</h2>
      <label id="search-box">Search by name: <input value={newSearch} name="search" type="text" onChange={handleSearch}/></label>
      <SearchResults deleteHandler={deleteContact} searchResults={searchResults} newSearch={newSearch}
                     persons={persons}/>
      {/*<p className="loading">Loading contacts...</p>*/}
    </div>
  );
};

const PersonForm = ({addContact, newName, handleName, newNumber, handleNumber}) => {

  return (
    <form onSubmit={addContact}>
      <div>
        <label>Name:</label>
        <input required value={newName} onChange={handleName} name="name" type="text"/>
      </div>
      <div>
        <label>Number:</label>
        <input required value={newNumber} onChange={handleNumber} name="number" type="text"/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({deleteHandler, name, number}) => {
  let numFormat;
  if (number.length === 10) {
    numFormat = `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
  } else if (number.length === 11) {
    numFormat = `+${number[0]} ${number.substring(1, 4)}  ${number.substring(4, 7)} ${number.substring(7)}`;

  }

  const elems = Array.from(document.querySelectorAll("table .scrollable"));
  for (const elem of elems) {
    if (elem.scrollWidth > elem.clientWidth) {
      elem.setAttribute("title", elem.innerText);
    }
  }

  return (
    <tr>
      <td>
        <div className="scrollable">{name}</div>
      </td>
      <td>
        <div className="scrollable">{numFormat || number}</div>
      </td>
      <td>
        <button type="button" name="delete-contact" onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
};

const SearchResults = ({deleteHandler, searchResults, newSearch, persons}) => {
  let toMapOver;

  if (newSearch.length && searchResults.length) { // bring up search results
    toMapOver = searchResults;
  } else if (newSearch.length) { // no results for query
    return <p id="no-results">No results found</p>;
  } else { // when nothing is being searched, show all contacts
    toMapOver = persons;
    // return persons.map((person) => <Person deleteHandler={() => deleteHandler(person.id)} key={person.id}
    //                                        name={person.name} number={person.number}/>);
  }
  const table = (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {toMapOver.map((person) => <Person deleteHandler={() => deleteHandler(person.id)} key={person.id}
                                         name={person.name} number={person.number}/>)}
      </tbody>
    </table>
  );

  return toMapOver.length ? table : <p className="loading">Loading contacts...</p>;


};

export default Phonebook;
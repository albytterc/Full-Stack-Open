import { useState } from "react";

const Phonebook = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456', id: 1},
    {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    {name: 'Dan Abramov', number: '12-43-234345', id: 3},
    {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [searchResults, setNewSearchResults] = useState([]);

  const addContact = (event) => {
    event.preventDefault();
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to the phonebook`);
        return;
      }
    }
    setPersons(persons.concat({name: newName, number: newNumber}));
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
    setNewSearchResults(persons.filter((person) => person.name.toLowerCase().includes(query)));
    setNewSearch(event.target.value);

  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addContact={addContact} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h2>Contacts</h2>
      <label>Search by name: <input value={newSearch} name="search" type="text" onChange={handleSearch}/></label>
      <SearchResults searchResults={searchResults} newSearch={newSearch} persons={persons}/>
    </div>
  );
};

const PersonForm = ({addContact, newName, handleName, newNumber, handleNumber}) => {

  return (
    <form onSubmit={addContact}>
      <div>
        <label>Name: <input value={newName} onChange={handleName} name="name" type="text"/></label>
      </div>
      <div>
        <label>Number: <input value={newNumber} onChange={handleNumber} name="number" type="text"/></label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({name, number}) => {
  return <p>{name} {number}</p>;
};

const SearchResults = ({searchResults, newSearch, persons}) => {
  if (newSearch.length && searchResults.length) {
    return searchResults.map((person) => <Person key={person.id} name={person.name} number={person.number}/>);
  } else if (newSearch.length) {
    return <p>No results found</p>;
  } else {
    return persons.map((person) => <Person key={person.id} name={person.name} number={person.number}/>);
  }
};

export default Phonebook;
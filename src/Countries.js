import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = () => {
  const [countryList, setCountryList] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  // search feature to filter by name


  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountryList(response.data);
      });
  }, []);


  const handleCountry = (event) => {

    setNewCountry(event.target.value);
  };

  return (
    <>
      <label>Search for a country: <input name="search" value={newCountry} onChange={handleCountry}
                                          type="text"/>
      </label>
      <SearchResults query={newCountry} countryList={countryList}/>
    </>
  );

};

const SearchResults = ({query, countryList}) => {

  let matches = countryList.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const exactMatch = matches.filter((country) =>
    country.name.common.toLowerCase() === query.toLowerCase()
  );

  if (exactMatch.length === 1) {
    matches = exactMatch;
  }

  const displayList = matches.length > 1 && matches.length <= 10;

  if (query.length && displayList) {
    return (
      <ul>
        {matches.map((country) => <li key={country.cca2}>{country.name.common}</li>)}
      </ul>
    );
  } else if (query.length && matches.length > 10) {
    return <p>More than 10 countries matches. Please narrow down your search.</p>;
  } else if (query.length && matches.length === 1) {
    return <Country data={matches[0]}/>;
  } else if (query.length) {
    return <p>No countries found</p>;
  }
  // } else if ()
};

const Country = ({data}) => {
  const name = data.name.common;
  // const capital = data.capital[0];
  const region = data.region;
  const subregion = data.subregion;
  const population = data.population.toLocaleString();
  const languages = data.languages;
  const flag = data.flag;

  let regionLine;
  if (subregion && region) {
    regionLine = <p>{subregion}, {region}</p>
  } else if (subregion) {
    regionLine = <p>{subregion}</p>
  } else if (region) {
    regionLine = <p>{region}</p>
  }

  return (
    <div>
      <h1>{name}</h1>
      {data.capital && <p>Capital: {data.capital[0]}</p>}
      {regionLine}
      <p>Population: {population}</p>
      {languages &&
        <>
          <h2>Languages</h2>
          <ul>{Object.entries(languages).map(([key, val]) => <li key={key}>{val}</li>)}</ul>
        </>
      }
      <h1 style={{fontSize: "12rem", margin: 0}}>{flag}</h1>
    </div>
  );


};

export default Countries;
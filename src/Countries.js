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
        {matches.map((country) => <CountryListEntry key={country.cca2} name={country.name.common}
                                                    data={country}/>/*<li key={country.cca2}>{country.name.common}</li>*/)}
      </ul>
    );
  } else if (query.length && matches.length > 10) {
    return <p>More than 10 countries matches. Please narrow down your search.</p>;
  } else if (query.length && matches.length === 1) {
    return <Country data={matches[0]}/>;
  } else if (query.length) {
    return <p>No countries found</p>;
  }
};

const CountryListEntry = ({name, data}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonName, setButtonName] = useState('View');

  return (
    <li>{name}&nbsp;
      <button name="details-button" type="button" onClick={() => {
        setShowDetails(!showDetails);
        setButtonName((prevName) => {
          if (prevName === 'View') return 'Hide';
          else return 'View';
        });
      }
      }>{buttonName}</button>
      {showDetails && <Country data={data}/>}
    </li>
  );
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
    regionLine = <p>{subregion}, {region}</p>;
  } else if (subregion) {
    regionLine = <p>{subregion}</p>;
  } else if (region) {
    regionLine = <p>{region}</p>;
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
      {data.capital &&
        <>
          <h1>Weather in {data.capital[0]}</h1>
          <Weather capitalInfo={data.capitalInfo} countryCode={data.cca2}/>
        </>
      }
    </div>
  );
};

const Weather = ({capitalInfo, countryCode}) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const {data} = await axios
      //   .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital},${countryCode}&limit=1&appid=${api_key}`);
      const [lat, lon] = [capitalInfo.latlng[0], capitalInfo.latlng[1]];
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`);
      const weather = response.data;
      setWeatherData(weather);
      setLoading(false);
    };
    fetchData();
  }, [api_key, capitalInfo, countryCode]);

  if (!loading) {
    return (
      <>
        <p>Current temperature: {weatherData.main.temp}&deg;F</p>
        <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
        <p>Wind speed: {weatherData.wind.speed} mph {weatherData.wind.deg}&deg;</p>
      </>
    );
  }
};


export default Countries;
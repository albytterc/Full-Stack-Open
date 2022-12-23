import axios from "axios";

// const baseUrl = 'http://localhost:3001'

const getAllPersons = () => {
  return axios
    .get('http://localhost:8000/persons')
    .then((response) => response.data);
};

const addPerson = (name, number) => {
  return axios
    .post('http://localhost:8000/persons', {name, number})
    .then((response) => response.data);
};

const updatePersonNumber = (id, name, number) => {
  return axios
    .put(`http://localhost:8000/persons/${id}`, {name, number})
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios
    .delete(`http://localhost:8000/persons/${id}`)
    .then((response) => response.data);

};

export default {getAllPersons, addPerson, updatePersonNumber, deletePerson};
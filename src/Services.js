import axios from "axios";

const baseUrl = '/api/persons'


const getAllPersons = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data);
};

const addPerson = (name, number) => {
  return axios
    .post(baseUrl, {name, number})
    .then((response) => response.data);
};

const updatePersonNumber = (id, name, number) => {
  return axios
    .put(`${baseUrl}/${id}`, {name, number})
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data);

};

export default {getAllPersons, addPerson, updatePersonNumber, deletePerson};
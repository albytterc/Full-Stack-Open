import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Phonebook from "./Phonebook";

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Phonebook />

document.title = `React ${element.type.name}`
root.render(<StrictMode>{element}</StrictMode>);

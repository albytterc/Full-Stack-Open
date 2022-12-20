import React from 'react';
import ReactDOM from 'react-dom/client';
import Countries from './Countries'

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Countries />

document.title = `React ${element.type.name}`
root.render(element);

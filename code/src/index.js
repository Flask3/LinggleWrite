import React from 'react';
import ReactDOM from 'react-dom/client';

import Translator from './Translator/Components/Translator';

import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginOutPage';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Translator />);
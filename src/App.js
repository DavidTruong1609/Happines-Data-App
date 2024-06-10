import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Rankings from './pages/Rankings/Rankings';
import Search from './pages/Search/Search';
import Factors from './pages/Factors';
import Register from './pages//Register/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/rankings" Component={Rankings} />
        <Route path="/search" Component={Search} />
        <Route path="/factors" Component={Factors} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;

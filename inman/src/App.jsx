// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Dashboard from './dash.jsx';
import Inventory from './inventory.jsx';
import Account from './account.jsx';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router >
  );
};

export default App;

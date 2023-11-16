import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Main from './components/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route exact path="/:className/:subject" element={<Main/>} />
      </Routes>
    </Router>
  );
};

export default App;

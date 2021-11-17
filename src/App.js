import React from 'react';
import {useLocation } from 'react-router-dom';
import Routes from './routes';

function App() {
  const location = useLocation();
  return (
    <div><Routes /></div>
  );
}

export default App;

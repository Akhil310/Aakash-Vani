import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './App';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <WeatherApp />
    </React.StrictMode>
  );
} 

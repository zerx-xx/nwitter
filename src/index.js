import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import "/Users/drizzle/nwitter/src/css/reset.css"
import "/Users/drizzle/nwitter/src/css/auth.modul.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

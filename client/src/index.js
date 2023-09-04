import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { RouterProvider } from "react-router-dom";
import { router } from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);




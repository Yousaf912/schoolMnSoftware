import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import { RouterProvider } from 'react-router-dom';
import { Allroutes } from './components/routes/routes.tsx';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Allroutes}/>
  </React.StrictMode>,
)

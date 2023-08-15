import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root from './components/root.jsx';
import Trains from './components/trains.jsx';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css" 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // path: "/",
        // element: <Root />,
        // errorElement: <ErrorRoute/>,
        // loader: teamLoader,
      },
      {
        path: "/trains",
        element: <Trains />,
        // errorElement: <ErrorRoute/>,
      },
     
    ],
  },
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

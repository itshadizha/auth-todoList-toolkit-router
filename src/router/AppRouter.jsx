import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import Login from '../pages/Login';
import Todos from '../pages/Todos';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRouter fallBackPath='/login' />,
      children: [
        { path: "/", element: <Todos /> },
        { path: "/todos", element: <Todos /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

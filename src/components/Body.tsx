import LoginForm from './LoginForm';
import Notes from "./Notes"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRouteNotes from '../routes/ProtectedRouteNotes';
import ProtectedRouteLogin from '../routes/ProtectedRouteLogin';
import { Navigate } from 'react-router-dom';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      element: <ProtectedRouteLogin />, 
      children: [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
    },
    {
      element: <ProtectedRouteNotes />,
      children: [
        {
          path: "/notes",
          element: <Notes />,
        },
      ],
    },
    {
      path: "*", 
      element: <Navigate to="/" replace />, 
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
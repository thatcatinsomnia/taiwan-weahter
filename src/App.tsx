import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/home';
import Rains from './routes/rains';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/rains',
    element: <Rains />,
    errorElement: <ErrorPage />
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}


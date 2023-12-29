import './App.css'
import Navbar from './components/Navbar'
import Introduction from './pages/Introduction'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Passwords from './pages/Passwords';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Introduction />,
    },
    {
      path: "/passwords",
      element: <ProtectedRoute><Passwords /></ProtectedRoute>
    }
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App

import Navbar from "./components/Navbar";
import Introduction from "./pages/Introduction";
import { Route, Routes } from "react-router-dom";
import Passwords from "./pages/Passwords";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster />
            <Navbar />
            <Routes>
                <Route path="/" element={<Introduction />} />
                <Route
                    path="/passwords"
                    element={
                        <ProtectedRoute>
                            <Passwords />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;

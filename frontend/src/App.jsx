import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2 className="logo">SpendWise</h2>

        <div className="nav-links">
          {isLoggedIn ? (
            <>          
              <Link to="/dashboard">Dashboard</Link>


             

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
        path="/dashboard"
         element={
         <ProtectedRoute>
           <Dashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
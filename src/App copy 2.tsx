import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import BurgerContent from "./components/BurgerContent";
import Profile from "./components/Pages/Profile/Profile";
import Login from "./components/Pages/Auth/Login/Login";
import PrivateRoutes from "./utils/ProtectedRoute/ProtectedRoute";

//Защищенный маршрут
// Интерфейс для Redux state
interface RootState {
  auth?: {
    isAuthenticated: boolean;
  };
}

function App() {
  const auth = useSelector(
    (state: RootState) => state.auth || { isAuthenticated: false }
  );
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<BurgerContent />} />
          <Route index element={<div>No page is selected.</div>} />
          <Route path="/login" element={<Login />} />
          {/* Защищенный маршрут */}
          <Route
            element={<PrivateRoutes isAuthenticated={auth.isAuthenticated} />}
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

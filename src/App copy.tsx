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

//Защищенный маршрут
// Интерфейс для Redux state
interface RootState {
  auth?: {
    isAuthenticated: boolean;
  };
}

// Защищенный маршрут
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector(
    (state: RootState) => state.auth || { isAuthenticated: false }
  );

  return auth.isAuthenticated ? children : <Navigate to="/login" replace />;
};
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<BurgerContent />} />

          <Route path="/login" element={<Login />} />
          {/* Защищенный маршрут */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

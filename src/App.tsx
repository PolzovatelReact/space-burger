import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import BurgerContent from "./components/BurgerContent";
import Profile from "./components/Pages/Profile/Profile";
import Login from "./components/Pages/Auth/Login/Login";
import NotPages from "./components/Pages/NotPages/NotPages";
import Register from "./components/Pages/Auth/Register/Register";
import TestLoginForm from "./components/Pages/Auth/TestLoginForm";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { loadUserFromStorage } from "./store/slices/authSlice";

//https://code.s3.yandex.net/react/checklists-pdf/tz/react_tz5.pdf
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        {/* <AppHeader /> */}
        <Routes>
          <Route path="/" element={<AppHeader />}>
            <Route index element={<BurgerContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<TestLoginForm />} />

            {/* Защищенный маршрут */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotPages />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

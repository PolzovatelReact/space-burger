import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login"); // Удалить авторизацию
  };

  console.log("Страница пользователя");
  return (
    <>
      <div>
        <h1>Страница профиля</h1>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <p>Имя: {user.name}</p>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <p>Нет данных о пользователе</p>
        )}
      </div>
    </>
  );
};
export default Profile;

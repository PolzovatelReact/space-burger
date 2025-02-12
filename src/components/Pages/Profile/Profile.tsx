import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Calculator from "../TestScript/Calculator";
import FetchData from "../TestScript/FetchData";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login"); // Удалить авторизацию
  };
  return (
    <>
      <div>
        <h1>Страница профиля</h1>
        {user ? ( // ? оператор который проверяет переменную user
          <>
            <p>Email: {user.email}</p>
            <p>Имя: {user.name}</p>
            <button onClick={handleLogout}>Выйти</button>
            <Calculator />
            <FetchData />
          </>
        ) : (
          <p>Нет данных о пользователе</p>
        )}
      </div>
    </>
  );
};
export default Profile;

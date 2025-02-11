import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import { registerUser } from "../../../../store/slices/registerSlice";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, hasError, error } = useSelector(
    (state: RootState) => state.register
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    dispatch(registerUser({ email, password, name }));
  };

  // Управление видимостью пароля
  const [isSwitchingPassword, setSwitchingPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setSwitchingPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.InputOne}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type={isSwitchingPassword ? "text" : "password"}
            icon={isSwitchingPassword ? "HideIcon" : "ShowIcon"}
            onIconClick={togglePasswordVisibility}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className={styles.buttom}>
          <Button
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium"
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
          {hasError && (
            <p className={styles.errorText}>
              {error || "Ошибка при регистрации"}
            </p>
          )}
        </div>
      </form>

      <div className={styles.footerLinks}>
        <p className="text text_type_main-default mt-2">
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

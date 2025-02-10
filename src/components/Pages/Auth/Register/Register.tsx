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
  const [name, setName] = useState<string>(""); // Состояние и типизация name
  const [email, setEmail] = useState<string>(""); // Состояние и типизация email
  const [password, setPassword] = useState<string>(""); // Состояние и типизация password
  const { isLoading, hasError } = useSelector(
    //
    (state: RootState) => state.register
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
  };
  //Состояние управления паролем
  const [isSwitchingPassword, setSwitchingPassword] = useState<boolean>(false);
  const switchingPassword = () => {
    setSwitchingPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.RegistrationBlock}>
        <h2 className={styles.title}>Регистрация</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.InputOne}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              onPointerEnterCapture={() => {}} // Передаем пустую функцию
              onPointerLeaveCapture={() => {}} // Передаем пустую функцию
            />
          </div>
          <div className={styles.InputTwo}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              onPointerEnterCapture={() => {}} // Передаем пустую функцию
              onPointerLeaveCapture={() => {}} // Передаем пустую функцию
            />
          </div>
          <div className={styles.InputTwo}>
            <Input
              type={isSwitchingPassword ? "text" : "password"}
              onIconClick={switchingPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onPointerEnterCapture={() => {}} // Передаем пустую функцию
              onPointerLeaveCapture={() => {}} // Передаем пустую функцию
              icon={"ShowIcon"}
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
            {/* {isLoading && <>Отправка</>} */}
            {hasError && <p>Error during registration</p>}
          </div>
        </form>

        <div className={styles.footerLinks}>
          <p className="text text_type_main-default mt-2">
            Уже зарегистрированны?
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;

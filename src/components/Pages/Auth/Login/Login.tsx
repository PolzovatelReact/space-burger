import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSwitchingPassword, setSwitchingPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    // Если user появился редирект на /profile
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.InputOne}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type={isSwitchingPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={isSwitchingPassword ? "HideIcon" : "ShowIcon"}
            onIconClick={() => setSwitchingPassword(!isSwitchingPassword)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className={styles.buttom}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </div>
      </form>
      {error && (
        <p className={styles.errorText}>Ошибка: {error || "Ошибка входа"}</p>
      )}
      <div className={styles.footerLinks}>
        <p className="text text_type_main-default">
          Вы новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default mt-2">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

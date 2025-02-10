import React from "react";
import styles from "./header.module.css";
import { Link, Outlet } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
const AppHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftBlock1}>
          <div className={styles.navigationLink}>
            <BurgerIcon type="primary" />{" "}
            <Link className="text text_type_main-default" to="/">
              Конструктор
            </Link>
          </div>
        </div>
        <div className={styles.leftBlock2}>
          <div className={styles.navigationLink}>
            <ListIcon type="primary" />
            <span className="text text_type_main-default">Лента заказов </span>
          </div>
        </div>
        <div className={styles.centerBlock}>
          <Logo />
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.navigationLink}>
            <ProfileIcon type="primary" />
            <Link className="text text_type_main-default" to="/profile">
              Личный кабинет
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
export default AppHeader;

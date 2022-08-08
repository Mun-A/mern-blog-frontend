import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useTypedSelector, useTypedDispatch } from "../../hooks";
import logo from "../../assets/img/logo.svg";

import { AccountMenu } from "../AccountMenu";
import { DarkMode } from "../DarkMode";

export const Header = () => {
  const dispatch = useTypedDispatch();
  const isAuth = useTypedSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img src={logo} alt="Логотип" width={50} height={50} />
          </Link>
          <DarkMode />
          <div className={styles.buttons}>
              <AccountMenu onClickLogout={onClickLogout} isAuth={isAuth} />
          </div>
        </div>
      </Container>
    </div>
  );
};

import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert(
        "Не удалось зарегистрироваться! Попробуйте перезагрузить страницу и попробовать ещё раз."
      );
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <div className={styles.content}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            type="text"
            autoComplete="off"
            {...register("fullName", { required: "Укажите полное имя" })}
            label="Полное имя"
            fullWidth
          />
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            autoComplete="off"
            {...register("email", { required: "Укажите почту" })}
            fullWidth
          />
          <TextField
            className={styles.field}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register("password", { required: "Укажите пароль" })}
            label="Пароль"
            type='password'
            fullWidth
          />
          <Button
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </Paper>
  );
};

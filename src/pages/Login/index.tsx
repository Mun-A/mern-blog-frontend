import { FC } from "react";
import { useTypedSelector, useTypedDispatch } from "../../hooks";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchAuth, LoginParamsType, selectIsAuth } from "../../redux/slices/auth";
import { UserType } from '../../models';

export const Login: FC = () => {
  const isAuth = useTypedSelector(selectIsAuth);
  const dispatch = useTypedDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginParamsType) => {
    const data = await dispatch(fetchAuth(values));

    if (!data) {
      alert(
        "Не удалось авторизоваться! Попробуйте перезагрузить страницу и попробовать ещё раз."
      );
    }

    const payload = data.payload as UserType;

    if ("token" in payload) {
      window.localStorage.setItem("token", payload.token);
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          label="Пароль"
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
      </div>
    </Paper>
  );
};

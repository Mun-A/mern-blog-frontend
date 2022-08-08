import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useTypedSelector } from "../../hooks";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "../../axios";
import { UserType } from '../../models';

export const AddPost: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuth = useTypedSelector(selectIsAuth);
  const userData = useTypedSelector((state) => state.auth.data);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentUserId, setCurrentUserId] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = e.target?.files?.[0];
      if (file) {
        formData.append("image", file);
      }

      const {
        data: { data },
      } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert(
        "Произошла ошибка при загрузке файла. Попробуйте перезагрузить страницу и попробовать снова."
      );
    }
  };

  const onClickRemoveImage = () => {
    if (window.confirm("Вы действительно хотите удалить изображение?")) {
      setImageUrl("");
    }
  };

  const onChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert(
        "Произошла ошибка при создании статьи. Попробуйте перезагрузить страницу и попробовать снова."
      );
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags.join(","));
          setImageUrl(data.imageUrl);
          setCurrentUserId(data.user._id);
        })
        .catch((err) => {
          console.warn(err);
          alert(
            "Произошла ошибка при получении статьи. Попробуйте перезагрузить страницу и попробовать снова."
          );
        });
    }
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: currentUserId
      },
    }),
    []
  );

  useEffect(() => {
    if (currentUserId && userData?._id && currentUserId !== userData?._id) {
      console.log("effect");
      navigate("/");
    }
  }, [currentUserId, userData]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }} className={styles.root}>
      <div className={styles.fileField}>
        <Button
          onClick={() => inputFileRef.current?.click()}
          variant="outlined"
          size="large"
        >
          Загрузить превью
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
            <div className={styles.fileFieldImg}>
              <img className={styles.image} src={imageUrl} alt="Uploaded" />
            </div>
          </>
        )}
      </div>
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

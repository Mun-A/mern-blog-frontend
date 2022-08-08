import { Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useTypedSelector, useTypedDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { Post } from "../../components";
import { fetchPosts, postsByTag } from "../../redux/slices/posts";

import styles from "./Tags.module.scss";

export const Tags: FC = () => {
  const { slug } = useParams();
  const userData = useTypedSelector((state) => state.auth.data);
  const dispatch = useTypedDispatch();
  const posts = useTypedSelector(postsByTag(slug ? slug : ''));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <h1 className={styles.title}>#{slug}</h1>
      <Grid container columnSpacing={3} rowSpacing={1}>
        {posts.map((item) => (
          <Grid item key={item._id} xs={12} md={6} lg={4}>
            <Post
              id={item._id}
              title={item.title}
              imageUrl={item.imageUrl ? item.imageUrl : ""}
              user={item.user}
              createdAt={item.createdAt}
              viewsCount={item.viewsCount}
              commentsCount={3}
              tags={item.tags}
              isEditable={userData?._id === item.user._id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

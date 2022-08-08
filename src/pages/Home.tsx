import { FC, useEffect, useState } from "react";
import { useTypedSelector, useTypedDispatch } from "../hooks";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { fetchPosts, fetchTags } from "../redux/slices/posts";

import styles from './Home.module.scss';
import { PostSkeleton } from '../components/Post/Skeleton';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Home: FC = () => {
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => state.auth.data);
  const { posts, tags } = useTypedSelector((state) => state.posts);
  const [value, setValue] = useState(0);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      dispatch(fetchPosts())
    } else {
      dispatch(fetchPosts('popular'))
    }
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className={styles.tabs}
      >
        <Tab label="Новые" {...a11yProps(0)} />
        <Tab label="Популярные" {...a11yProps(1)} />
      </Tabs>
      <Grid container spacing={{xs: 2, md: 4}}>
        <Grid xs={12} md={8} order={{ xs: 2, md: 1}} item>
          <div
            role="tabpanel"
            hidden={value !== 0}
            id={`simple-tabpanel-${0}`}
            aria-labelledby={`simple-tab-${0}`}
          >
            {(isPostsLoading ? [...Array(5)] : posts.items).map((item, idx) =>
              isPostsLoading ? (
                <PostSkeleton key={idx} />
              ) : (
                <Post
                  id={item._id}
                  key={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl ? item.imageUrl : ""}
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isEditable={userData?._id === item.user._id}
                />
              )
            )}
          </div>
          <div
            role="tabpanel"
            hidden={value !== 1}
            id={`simple-tabpanel-${1}`}
            aria-labelledby={`simple-tab-${1}`}
          >
            {(isPostsLoading ? [...Array(5)] : posts.items).map((item, idx) =>
              isPostsLoading ? (
                <PostSkeleton key={idx} />
              ) : (
                <Post
                  id={item._id}
                  key={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl ? item.imageUrl : ""}
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isEditable={userData?._id === item.user._id}
                />
              )
            )}
          </div>
        </Grid>
        <Grid xs={12} md={4} order={{ xs: 1, md: 2}} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};

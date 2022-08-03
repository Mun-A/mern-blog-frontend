import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import axios from "../axios";

export const FullPost = () => {
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${id}`);
        setItem(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert("Ошибка при получении статьи");
      }
    };

    fetchPost();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={item._id}
        title={item.title}
        imageUrl={item.imageUrl ? item.imageUrl : ""}
        user={item.user}
        createdAt={item.createdAt}
        viewsCount={item.viewsCount}
        commentsCount={3}
        tags={item.tags}
        isFullPost
      >
        <ReactMarkdown children={item.text} />
      </Post>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
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
      >
        <Index />
      </CommentsBlock> */}
    </>
  );
};

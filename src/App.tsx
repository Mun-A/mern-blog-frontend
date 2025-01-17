import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Tags } from "./pages";
import { fetchLogin, selectIsAuth } from "./redux/slices/auth";
import { useTypedSelector, useTypedDispatch } from "./hooks";

function App() {
  const dispatch = useTypedDispatch();
  const isAuth = useTypedSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchLogin());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:slug" element={<Tags />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthLayout } from "./components/index.js";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import EditPost from "./pages/EditPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Post from "./pages/Post.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route path="/" element={<Home />} />
      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:id"
        element={
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        }
      />

      <Route
        path="/post/:id"
        element={
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
    </Provider>
  </StrictMode>,
);

import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import MoviePage from "../page/MoviePage";
import PathNotFound from "../page/PathNotFound";
import AdminStstem from "../page/AdminStstem";
import HistoryListMovie from "../page/HistoryListMovie";
import MainLayout from "../conponent/layout/MainLayout";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";

const PrivateRoute = observer(({ children }: { children: React.ReactNode }) => {
  if (!authStore.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
});

const PublicRoute = observer(({ children }: { children: React.ReactNode }) => {
  if (authStore.isAuth) {
    return <Navigate to="/settingslistmovie" replace />;
  }

  return <>{children}</>;
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/settingslistmovie" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "settingslistmovie",
        element: (
          <PrivateRoute>
            <MoviePage />
          </PrivateRoute>
        ),
      },
      {
        path: "adminsystem",
        element: (
          <PrivateRoute>
            <AdminStstem />
          </PrivateRoute>
        ),
      },
      {
        path: "historyedits",
        element: (
          <PrivateRoute>
            <HistoryListMovie />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PathNotFound />,
  },
]);

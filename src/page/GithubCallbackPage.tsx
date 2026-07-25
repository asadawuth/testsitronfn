import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { authStore } from "../store/authStore";

const GithubCallbackPage = () => {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const loginWithGithub = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get("code");

        if (!code) {
          throw new Error("GitHub did not return an authorization code");
        }

        const res = await api.post("/users/github", { code });

        authStore.setUser(res.data.user, res.data.accessToken);
        nav("/settingslistmovie", { replace: true });
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "GitHub login failed");
      }
    };

    loginWithGithub();
  }, [nav]);

  return <div>{error ? error : "Signing in with GitHub..."}</div>;
};

export default GithubCallbackPage;

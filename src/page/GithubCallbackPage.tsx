import { useEffect } from "react";

const GithubCallbackPage = () => {
  useEffect(() => {
    console.log("Github callback loaded");

    const params = new URLSearchParams(window.location.search);
    console.log(params.get("code"));
  }, []);

  return <div>Github Callback</div>;
};

export default GithubCallbackPage;

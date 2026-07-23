export const loadGoogleScript = () =>
  new Promise<void>((resolve, reject) => {
    if ((window as any).google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Cannot load Google sign-in")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const check = setInterval(() => {
        if ((window as any).google?.accounts?.oauth2) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    };
    script.onerror = () => reject(new Error("Cannot load Google sign-in"));

    document.body.appendChild(script);
  });

export const loadFacebookScript = () =>
  new Promise<void>((resolve, reject) => {
    if ((window as any).FB) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://connect.facebook.net/en_US/sdk.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true,
      });

      existingScript.addEventListener(
        "error",
        () => reject(new Error("Cannot load Facebook SDK")),
        {
          once: true,
        },
      );

      return;
    }

    const script = document.createElement("script");

    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      (window as any).FB.init({
        appId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
        cookie: true,
        xfbml: false,
        version: "v23.0",
      });

      resolve();
    };

    script.onerror = () => reject(new Error("Cannot load Facebook SDK"));

    document.body.appendChild(script);
  });

export const getGithubLoginUrl = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  const redirectUri = encodeURIComponent(
    "http://localhost:5173/auth/github/callback",
  );

  return (
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=read:user user:email`
  );
};

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";
import { authApi } from "../api/authapi";
import { loadGoogleScript } from "../api/oauthHelper";

const roleAccounts = {
  MANAGER: {
    email: "taodewy@gmail.com",
    password: "Asadawuth41.",
  },
  TEAMLEADER: {
    email: "taodewy1@gmail.com",
    password: "Itaosd41.",
  },
  FLOORSTAFF: {
    email: "taodewy3@gmail.com",
    password: "Itaosd41.",
  },
};

const LoginPage = observer(() => {
  const nav = useNavigate();
  const googleTokenClient = useRef<any>(null);
  const roleRef = useRef("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    roleRef.current = selectedRole;
    const account = roleAccounts[selectedRole as keyof typeof roleAccounts];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  const handleLogin = async () => {
    try {
      setError("");
      await authStore.login(email, password);
      nav("/settingslistmovie");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    const setupGoogleLogin = async () => {
      try {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        await loadGoogleScript();

        const google = (window as any).google;
        if (!clientId || !google?.accounts?.oauth2) {
          throw new Error("Google OAuth is not ready");
        }

        googleTokenClient.current = google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "openid email profile",
          callback: handleGoogleSuccess,
        });
        setGoogleReady(true);
      } catch (err) {
        console.error(err);
        setError("Cannot load Google login");
      }
    };

    setupGoogleLogin();
  }, []);

  const handleGoogleLogin = () => {
    setError("");
    googleTokenClient.current?.requestAccessToken();
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      setOauthLoading(true);

      if (tokenResponse.error || !tokenResponse.access_token) {
        throw new Error(tokenResponse.error || "Google login failed");
      }

      const profileRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        },
      );

      if (!profileRes.ok) {
        throw new Error("Cannot get Google profile");
      }

      const profile = await profileRes.json();
      const oauthData = {
        provider_user_id: profile.sub,
        provider_email: profile.email,
        email: profile.email,
        first_name: profile.given_name || "",
        last_name: profile.family_name || "",
        profile_picture: profile.picture || "",
        access_token: tokenResponse.access_token,
        role: roleRef.current,
      };

      const result = await authApi.oauthLogin("GOOGLE", oauthData);
      authStore.setUser(result.user, result.accessToken);
      nav("/settingslistmovie");
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    } finally {
      setOauthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-red-950 opacity-90"></div>
      <div className="absolute w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20 top-10 left-20"></div>
      <div className="absolute w-72 h-72 bg-red-500 rounded-full blur-3xl opacity-20 bottom-10 right-20"></div>
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 tracking-wider">
            MOVIE ADMIN
          </h1>
          <p className="text-gray-300 mt-2">Manage your movie system</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">
            Select Role
          </label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="" disabled hidden>
              Select Role
            </option>
            <option value="MANAGER">MANAGER</option>
            <option value="TEAMLEADER">TEAM LEADER</option>
            <option value="FLOORSTAFF">FLOOR STAFF</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">Email</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">Password</label>
          <input
            type="password"
            value={password}
            readOnly
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white outline-none"
          />
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}
        <button
          onClick={handleLogin}
          disabled={authStore.loading || !role}
          className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
        >
          {authStore.loading ? "Logging in..." : "Login"}
        </button>

        {/* Oauth */}
        <div>
          <div>
            <button
              onClick={handleGoogleLogin}
              disabled={!googleReady || oauthLoading || !role}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black py-3 rounded-lg 
          font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <img
                src="https://www.google.com/favicon.ico"
                className="w-5 h-5"
                alt=""
              />
              {oauthLoading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>
        {/* Oauth */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Movie Management System
        </div>
      </div>
    </div>
  );
});

export default LoginPage;

import { useState } from "react";
import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import LogoutModel from "../../model/LogoutModel";
import LogoutAllModel from "../../model/LogoutAllModel";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openLogoutAll, setOpenLogoutAll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleOpenLogout = () => {
    setOpenLogout(!openLogout);
  };
  const handleOpenLogoutAll = () => {
    setOpenLogoutAll(!openLogoutAll);
  };
  const isSettingPage = location.pathname === "/settingslistmovie";
  const isAdminSystemPage = location.pathname === "/adminsystem";
  const isHistoryEdits = location.pathname === "/historyedits";
  return (
    <>
      <header className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-red-600 relative">
        <h1 className="text-xl font-bold text-red-500">MOVIE ADMIN</h1>
        <div className="flex items-center gap-4 relative">
          <span className="text-sm text-gray-300 font-medium">
            {authStore.user?.role}
          </span>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <Menu size={24} />
          </button>
          {openMenu && (
            <div className="absolute z-50 top-12 right-0 w-60 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  navigate("/settingslistmovie");
                  setOpenMenu(false);
                }}
                className={`w-full text-left px-4 py-3 transition cursor-pointer
                  ${
                    isSettingPage ? "bg-red-600 text-white" : "hover:bg-red-600"
                  }`}
              >
                SettingList
              </button>
              <button
                onClick={() => {
                  navigate("/historyedits");
                  setOpenMenu(false);
                }}
                className={`w-full text-left px-4 py-3 transition cursor-pointer
                  ${
                    isHistoryEdits
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-600"
                  }`}
              >
                History SettingList
              </button>
              <button
                onClick={() => {
                  navigate("/adminsystem");
                  setOpenMenu(false);
                }}
                className={`w-full text-left px-4 py-3 transition cursor-pointer
                  ${
                    isAdminSystemPage
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-600"
                  }`}
              >
                Admin System
              </button>
              <button
                onClick={handleOpenLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>

              <button
                onClick={handleOpenLogoutAll}
                className="w-full text-left px-4 py-3 hover:bg-red-600 transition cursor-pointer"
              >
                Logout Completely
              </button>
            </div>
          )}
        </div>
      </header>

      <LogoutModel open={openLogout} onClose={() => setOpenLogout(false)} />

      <LogoutAllModel
        open={openLogoutAll}
        onClose={() => setOpenLogoutAll(false)}
      />
    </>
  );
}

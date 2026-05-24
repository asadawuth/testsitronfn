import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";
import { observer } from "mobx-react-lite";

type Props = {
  open: boolean;
  onClose: () => void;
};

const LogoutAllModel = observer(({ open, onClose }: Props) => {
  const nav = useNavigate();
  const handleLogoutAll = async () => {
    try {
      await authStore.logoutAll();
      nav("/login");
    } catch (error) {
      console.log(error);
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-gray-900 border border-red-500 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-3"></h2>
        <p className="text-gray-300 mb-6">
          Do you want to log out? You will need to log in again to access all
          features of this application.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogoutAll}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
});

export default LogoutAllModel;

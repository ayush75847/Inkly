import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.log("Logout Button Error", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400 active:scale-95"
    >
      Log Out
    </button>
  );
}

export default LogoutBtn;

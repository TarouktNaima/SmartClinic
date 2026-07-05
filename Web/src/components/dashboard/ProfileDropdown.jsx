import { useState } from "react";
import {
  UserCircle,
  LogOut,
  ChevronDown,
  Settings,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white hover:bg-white/20 transition"
      >
        <UserCircle className="text-indigo-300" />

        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold">{user?.name || "User"}</p>
          <p className="text-xs text-slate-400">{user?.role || "admin"}</p>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-3xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-4 shadow-2xl z-50">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-3">
            <UserCircle className="text-indigo-300" size={42} />

            <div>
              <p className="text-white font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-slate-400 text-sm">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 bg-white/5">
              <Shield size={17} />
              Role: {user?.role || "admin"}
            </div>

            <button className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10">
              <Settings size={17} />
              Settings
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-red-300 hover:bg-red-500/10"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
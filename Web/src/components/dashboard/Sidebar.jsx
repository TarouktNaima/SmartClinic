import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  LogOut,
  Menu,
  X,
  UsersRound,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || localStorage.getItem("role") || "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "secretary"],
    },
    {
      to: "/add-doctor",
      label: "Add Doctor",
      icon: UserPlus,
      roles: ["admin"],
    },
    {
      to: "/doctors",
      label: "Doctors",
      icon: UsersRound,
      roles: ["admin"],
    },
    {
      to: "/specialities",
      label: "Specialities",
      icon: Stethoscope,
      roles: ["admin", "secretary", "patient"],
    },
  ];

  const allowedLinks = links.filter((link) => link.roles.includes(role));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-2xl bg-indigo-500 text-white p-3 shadow-lg"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static z-50 min-h-screen w-72 
          border-r border-white/10 bg-slate-950/80 backdrop-blur-xl p-6
          transition-all duration-300
          ${open ? "left-0" : "-left-80 lg:left-0"}
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-white">
            Smart<span className="text-indigo-400">Clinic</span>
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white"
          >
            <X />
          </button>
        </div>

        <nav className="space-y-3">
          {allowedLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-2xl transition
                  ${
                    isActive
                      ? "bg-indigo-500/30 text-white border border-indigo-400/20"
                      : "text-slate-300 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={20} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-300 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
}
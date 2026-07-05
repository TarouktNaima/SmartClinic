import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  LogOut,
  Menu,
  X,
  UsersRound,
  Shield,
  ClipboardList,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  UserRound,
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
    navigate("/");
  };

  const links = [
    {
      to: "/dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      roles: ["admin", "secretary"],
    },
    {
      to: "/add-doctor",
      label: "Ajouter un médecin",
      icon: UserPlus,
      roles: ["admin"],
    },
    {
      to: "/doctors",
      label: "Médecins",
      icon: UsersRound,
      roles: ["admin"],
    },
    {
      to: "/admins",
      label: "Admins",
      icon: ShieldCheck,
      roles: ["admin"],
    },
    {
      to: "/secretaries",
      label: "Secrétaires",
      icon: UserRound,
      roles: ["admin"],
    },
    {
      to: "/specialities",
      label: "Spécialités",
      icon: Stethoscope,
      roles: ["admin", "secretary", "patient"],
    },
    {
      to: "/add-admin",
      label: "Ajouter un admin",
      icon: Shield,
      roles: ["admin"],
    },
    {
      to: "/add-secretary",
      label: "Ajouter une secrétaire",
      icon: ClipboardList,
      roles: ["admin"],
    },
    {
      to: "/patients",
      label: "Patients",
      icon: UsersRound,
      roles: ["admin", "doctor"],
    },
    {
      to: "/gestion-rdv",
      label: "Rendez-vous",
      icon: CalendarDays,
      roles: ["admin", "secretary"],
    },
  ];

  const allowedLinks = links.filter((link) => link.roles.includes(role));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-[#B3CFE5]/25 bg-[#1A3D63] p-3 text-white shadow-lg shadow-[#0A1931]/40 transition hover:bg-[#4A7FA7] lg:hidden"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#0A1931]/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static z-50 min-h-screen w-72
          border-r border-[#B3CFE5]/15 bg-[#0A1931]/95 p-6
          shadow-2xl shadow-[#0A1931]/60 backdrop-blur-xl
          transition-all duration-300
          ${open ? "left-0" : "-left-80 lg:left-0"}
        `}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#B3CFE5] to-[#1A3D63] text-white shadow-lg shadow-[#4A7FA7]/20">
              <HeartPulse size={24} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                Smart<span className="text-[#4A7FA7]">Clinic</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B3CFE5]">
                Espace médical
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-[#B3CFE5] transition hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {allowedLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300
                  ${
                    isActive
                      ? "border border-[#B3CFE5]/25 bg-gradient-to-r from-[#1A3D63] to-[#4A7FA7]/70 text-white shadow-lg shadow-[#4A7FA7]/15"
                      : "text-[#B3CFE5] hover:bg-[#1A3D63]/55 hover:text-white"
                  }`
                }
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#102A4B] text-[#B3CFE5] transition group-hover:bg-[#4A7FA7] group-hover:text-white">
                  <Icon size={17} />
                </div>

                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-[#B3CFE5]/15 bg-[#102A4B]/70 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B3CFE5]">
            Rôle connecté
          </p>
          <p className="mt-1 text-sm font-bold capitalize text-white">
            {role}
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-red-400/15 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>
    </>
  );
}
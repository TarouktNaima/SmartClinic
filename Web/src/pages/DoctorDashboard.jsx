import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  ClipboardPlus,
  UserRound,
  LogOut,
  Stethoscope,
  ArrowUpRight,
  Clock3,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    toast.success("Déconnexion réussie");

    navigate("/");
  };

  const menuItems = [
    {
      title: "My Appointments",
      description: "View and manage your medical appointments.",
      icon: CalendarDays,
      path: "/doctor/appointments",
      number: "01",
    },
    {
      title: "My Patients",
      description: "Access patients assigned to your medical care.",
      icon: Users,
      path: "/doctor/patients",
      number: "02",
    },
    {
      title: "My Consultations",
      description: "Review and manage your medical consultations.",
      icon: ClipboardPlus,
      path: "/doctor/consultations",
      number: "03",
    },
    {
      title: "My Profile",
      description: "View and manage your professional information.",
      icon: UserRound,
      path: "/doctor/profile",
      number: "04",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07101f] text-white">
      {/* BACKGROUND EFFECTS */}

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[150px]"
      />

      <div className="relative z-10 min-h-screen">
        {/* HEADER */}

        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-2xl lg:px-12">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10"
            >
              <Stethoscope className="text-indigo-300" size={25} />
            </motion.div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                SmartClinic
              </h1>

              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Doctor Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="font-semibold text-white">
                Dr. {user.name || "Doctor"}
              </p>

              <p className="text-sm capitalize text-indigo-300">
                {user.role || "doctor"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 font-bold text-indigo-200">
              {(user.name || "D").charAt(0).toUpperCase()}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
              title="Logout"
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </header>

        {/* CONTENT */}

        <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-12 lg:py-14">
          {/* HERO */}

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl lg:p-12"
          >
            <div className="absolute right-[-80px] top-[-100px] h-80 w-80 rounded-full bg-indigo-500/20 blur-[100px]" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
                  <Activity size={16} />

                  Medical Workspace
                </div>

                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-300">
                  Welcome back
                </p>

                <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Good to see you,
                  <span className="block bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    Dr. {user.name || "Doctor"}
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 lg:text-lg">
                  Access your medical workspace, manage your patients and
                  follow your daily clinical activity.
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden justify-center lg:flex"
              >
                <div className="relative flex h-64 w-64 items-center justify-center rounded-[60px] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/5 shadow-2xl">
                  <div className="absolute inset-8 rounded-full bg-indigo-500/20 blur-3xl" />

                  <Stethoscope
                    size={115}
                    strokeWidth={1}
                    className="relative text-indigo-200"
                  />
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* QUICK INFO */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
              <Clock3 size={17} className="text-indigo-300" />
              Doctor workspace
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              Account Active
            </div>
          </motion.div>

          {/* MENU */}

          <section className="mt-12">
            <div className="mb-7">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
                Clinical Workspace
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Manage your activity
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 * index,
                      duration: 0.5,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => handleNavigation(item.path)}
                    className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-7 text-left backdrop-blur-xl transition hover:border-indigo-400/30 hover:bg-white/[0.09] lg:p-8"
                  >
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-[70px] transition duration-500 group-hover:bg-indigo-500/20" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ rotate: -5 }}
                          className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-indigo-400/20 bg-indigo-500/10"
                        >
                          <Icon
                            size={30}
                            strokeWidth={1.6}
                            className="text-indigo-200"
                          />
                        </motion.div>

                        <span className="text-sm font-bold tracking-[0.2em] text-slate-600">
                          {item.number}
                        </span>
                      </div>

                      <div className="mt-10 flex items-end justify-between gap-5">
                        <div>
                          <h4 className="text-2xl font-bold text-white">
                            {item.title}
                          </h4>

                          <p className="mt-3 max-w-md leading-7 text-slate-400">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:border-indigo-400/30 group-hover:bg-indigo-500/20">
                          <ArrowUpRight
                            size={21}
                            className="text-slate-400 transition group-hover:text-indigo-200"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
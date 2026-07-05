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
  ShieldCheck,
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
      title: "Mes rendez-vous",
      description:
        "Consultez et gérez facilement vos rendez-vous médicaux.",
      icon: CalendarDays,
      path: "/doctor/appointments",
      number: "01",
    },
    {
      title: "Mes patients",
      description:
        "Accédez aux patients suivis dans le cadre de votre activité médicale.",
      icon: Users,
      path: "/doctor/patients",
      number: "02",
    },
    {
      title: "Mes consultations",
      description:
        "Consultez et gérez l'ensemble de vos consultations médicales.",
      icon: ClipboardPlus,
      path: "/doctor/consultations",
      number: "03",
    },
    {
      title: "Mon profil",
      description:
        "Consultez et gérez vos informations professionnelles.",
      icon: UserRound,
      path: "/doctor/profile",
      number: "04",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
      <div className="relative min-h-screen">
        {/* ANIMATION ARRIÈRE-PLAN */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 55, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
        />

        <div className="relative z-10 min-h-screen">
          {/* HEADER */}

          <header className="border-b border-[#B3CFE5]/15 bg-[#0A1931]/75 px-5 py-4 backdrop-blur-xl lg:px-10">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.05,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 shadow-lg shadow-[#0A1931]/30"
                >
                  <Stethoscope
                    className="text-[#B3CFE5]"
                    size={23}
                  />
                </motion.div>

                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-white">
                    Smart
                    <span className="text-[#B3CFE5]">
                      Clinic
                    </span>
                  </h1>

                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B3CFE5]/60">
                    Espace médecin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-white">
                    Dr. {user.name || "Médecin"}
                  </p>

                  <p className="mt-0.5 text-xs font-semibold capitalize text-[#B3CFE5]">
                    Médecin
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 text-sm font-extrabold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20">
                  {(user.name || "M")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                  title="Se déconnecter"
                >
                  <LogOut size={19} />
                </motion.button>
              </div>
            </div>
          </header>

          {/* CONTENU */}

          <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10 lg:py-10">
            {/* HERO */}

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-7 shadow-2xl shadow-[#0A1931]/40 lg:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#4A7FA7]/25 blur-[100px]" />

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/45 px-4 py-2 text-xs font-bold text-[#B3CFE5]">
                    <Activity size={15} />

                    Espace médical
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                    Bienvenue
                  </p>

                  <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                    Heureux de vous revoir,
                    <span className="mt-1 block text-[#B3CFE5]">
                      Dr. {user.name || "Médecin"}
                    </span>
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#F6FAFD]/70 lg:text-base">
                    Accédez à votre espace médical, gérez vos
                    patients et suivez facilement votre activité
                    clinique quotidienne.
                  </p>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="hidden justify-center lg:flex"
                >
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-[45px] border border-[#B3CFE5]/20 bg-[#0A1931]/40 shadow-2xl shadow-[#0A1931]/30">
                    <div className="absolute inset-8 rounded-full bg-[#4A7FA7]/25 blur-3xl" />

                    <Stethoscope
                      size={100}
                      strokeWidth={1}
                      className="relative text-[#B3CFE5]"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* INFORMATIONS RAPIDES */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 px-4 py-3 text-sm font-semibold text-[#B3CFE5]">
                <Clock3 size={16} />

                Espace médecin
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
                <ShieldCheck size={16} />

                Compte actif
              </div>
            </motion.div>

            {/* MENU */}

            <section className="mt-10">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                  Espace clinique
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-white lg:text-3xl">
                  Gérez votre activité
                </h3>

                <p className="mt-2 text-sm text-[#F6FAFD]/60">
                  Accédez rapidement aux fonctionnalités de votre
                  espace médical.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.12 * index,
                        duration: 0.45,
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={() =>
                        handleNavigation(item.path)
                      }
                      className="group relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 text-left shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition hover:border-[#4A7FA7]/60 lg:p-7"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4A7FA7]/10 blur-[70px] transition duration-500 group-hover:bg-[#4A7FA7]/25" />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <motion.div
                            whileHover={{ rotate: -5 }}
                            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70"
                          >
                            <Icon
                              size={27}
                              strokeWidth={1.6}
                              className="text-[#B3CFE5]"
                            />
                          </motion.div>

                          <span className="text-xs font-extrabold tracking-[0.2em] text-[#B3CFE5]/35">
                            {item.number}
                          </span>
                        </div>

                        <div className="mt-8 flex items-end justify-between gap-5">
                          <div>
                            <h4 className="text-xl font-extrabold text-white lg:text-2xl">
                              {item.title}
                            </h4>

                            <p className="mt-3 max-w-md text-sm leading-6 text-[#F6FAFD]/60">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/50 transition group-hover:bg-[#4A7FA7]">
                            <ArrowUpRight
                              size={19}
                              className="text-[#B3CFE5] transition group-hover:text-white"
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
    </div>
  );
}
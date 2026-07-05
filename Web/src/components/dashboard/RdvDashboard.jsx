import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CalendarPlus,
  CalendarDays,
  CalendarCheck,
  History,
  ArrowUpRight,
  Activity,
  LogOut,
  HeartPulse,
  UserRound,
} from "lucide-react";

function RdvDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    toast.success("Déconnexion réussie");
    navigate("/");
  };

  const tools = [
    {
      id: "create-rdv",
      title: "Prendre un rendez-vous",
      desc: "Choisissez une spécialité, un médecin et réservez votre créneau.",
      icon: CalendarPlus,
      path: "/specialities",
      number: "01",
    },
    {
      id: "my-rdv",
      title: "Mes rendez-vous",
      desc: "Consultez et gérez facilement vos prochains rendez-vous médicaux.",
      icon: CalendarDays,
      path: "/mes-rendezvous",
      number: "02",
    },
    {
      id: "history-rdv",
      title: "Historique",
      desc: "Consultez l’historique de vos rendez-vous et consultations.",
      icon: History,
      path: "/dashboard/historique",
      number: "03",
    },
    {
      id: "dispo-slots",
      title: "Disponibilités",
      desc: "Consultez les créneaux disponibles des médecins.",
      icon: CalendarCheck,
      path: "/dashboard/disponibilites",
      number: "04",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
      <div className="relative min-h-screen">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
        />

        <main className="relative z-10 mx-auto max-w-7xl p-5 lg:p-8">
          {/* Header simple */}
          <header className="mb-7 flex flex-col gap-4 rounded-[24px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-4 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A3D63] to-[#4A7FA7] text-white">
                <HeartPulse size={25} />
              </div>

              <div>
                <h1 className="text-xl font-extrabold">
                  Smart<span className="text-[#B3CFE5]">Clinic</span>
                </h1>
                <p className="text-xs font-semibold text-[#B3CFE5]">
                  Espace patient
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/50 px-3 py-2">
                <UserRound size={17} className="text-[#B3CFE5]" />
                <span className="text-sm font-bold">
                  {user?.name || "Patient"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Déconnexion
              </button>
            </div>
          </header>

          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-7 shadow-2xl shadow-[#0A1931]/40 lg:p-9"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#4A7FA7]/20 blur-[90px]" />

            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/45 px-4 py-2 text-xs font-bold text-[#B3CFE5]">
                <Activity size={16} />
                Tableau de bord patient
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Gestion des rendez-vous
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                Gérez vos <span className="text-[#B3CFE5]">rendez-vous</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F6FAFD]/70">
                Réservez, consultez et gérez vos rendez-vous médicaux facilement
                depuis votre espace SmartClinic.
              </p>
            </div>
          </motion.section>

          {/* Cards */}
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Accès rapide
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-white">
                Que souhaitez-vous faire ?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {tools.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.12 + index * 0.07,
                    }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(item.path)}
                    className="group relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 text-left shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition hover:border-[#4A7FA7]/60 hover:bg-[#102A4B]"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#4A7FA7]/10 blur-[60px] transition group-hover:bg-[#4A7FA7]/20" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 text-[#B3CFE5] transition group-hover:bg-[#4A7FA7] group-hover:text-white">
                          <Icon size={25} />
                        </div>

                        <span className="text-xs font-extrabold tracking-[0.15em] text-[#B3CFE5]/35">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-extrabold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-[#B3CFE5]/70">
                        {item.desc}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#B3CFE5]/10 pt-4">
                        <span className="text-xs font-bold text-[#B3CFE5]/60">
                          Accéder
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5] transition group-hover:bg-[#4A7FA7] group-hover:text-white">
                          <ArrowUpRight size={18} />
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

export default RdvDashboard;
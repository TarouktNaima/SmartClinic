import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  CalendarDays,
  CalendarCheck,
  History,
  ArrowUpRight,
  Activity,
  Clock3,
} from "lucide-react";

function RdvDashboard() {
  const navigate = useNavigate();

  const tools = [
    {
      id: "create-rdv",
      title: "Prendre un Rendez-vous",
      desc: "Choisir une spécialité, un médecin et réserver un créneau en ligne.",
      icon: CalendarPlus,
      path: "/specialities",
      number: "01",
    },
    {
      id: "my-rdv",
      title: "Mes Rendez-vous",
      desc: "Consulter ou gérer vos consultations à venir.",
      icon: CalendarDays,
      path: "/mes-rendezvous",
      number: "02",
    },
    {
      id: "history-rdv",
      title: "Historique",
      desc: "Accéder à l’historique de vos consultations.",
      icon: History,
      path: "/dashboard/historique",
      number: "03",
    },
    {
      id: "dispo-slots",
      title: "Disponibilités",
      desc: "Voir les horaires disponibles des médecins.",
      icon: CalendarCheck,
      path: "/dashboard/disponibilites",
      number: "04",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07101f] text-white">

      {/* BACKGROUND */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-600/20 blur-[150px]"
      />

      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -80, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[150px]"
      />

      <div className="relative z-10 px-6 py-10 lg:px-12">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl lg:p-12"
        >
          <div className="absolute right-[-80px] top-[-100px] h-80 w-80 rounded-full bg-indigo-500/20 blur-[100px]" />

          <div className="relative z-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
              <Activity size={16} />
              Patient Workspace
            </div>

            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-300">
              Welcome
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Gestion des
              <span className="block bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Rendez-vous
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-7 text-slate-400">
              Réservez et gérez vos rendez-vous médicaux facilement.
            </p>

          </div>
        </motion.section>

        {/* CARDS */}
        <section className="mt-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {tools.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  onClick={() => navigate(item.path)}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-7 text-left backdrop-blur-xl hover:border-indigo-400/30 hover:bg-white/[0.09]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-indigo-400/20 bg-indigo-500/10">
                      <Icon className="text-indigo-200" size={28} />
                    </div>

                    <span className="text-sm font-bold text-slate-600">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-slate-400">{item.desc}</p>

                  <div className="mt-8 flex items-center justify-end">
                    <ArrowUpRight className="text-slate-400 group-hover:text-indigo-200" />
                  </div>

                </motion.button>
              );
            })}

          </div>
        </section>

      </div>
    </div>
  );
}

export default RdvDashboard;
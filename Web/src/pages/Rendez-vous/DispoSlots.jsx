import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  Building,
  ShieldCheck,
  Search,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import api from "../../api/axios";

function DispoSlots() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const cliniqueHoraires = [
    { jour: "Lundi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Mardi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Mercredi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Jeudi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Vendredi", heures: "08:00 - 18:00", statut: "Ouvert" },
    {
      jour: "Samedi",
      heures: "08:30 - 13:00",
      statut: "Urgence uniquement",
    },
    { jour: "Dimanche", heures: "Fermé", statut: "Fermé" },
  ];

  const joursSemaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");

        setDoctors(res.data.data || res.data || []);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des médecins :",
          err
        );
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-8 text-white md:px-10">
      <div className="relative mx-auto max-w-7xl">
        {/* Animation arrière-plan */}
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
          className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
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
          className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
        />

        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(-1)}
          className="relative z-10 mb-6 flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 px-4 py-3 text-sm font-bold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20 transition hover:bg-[#1A3D63] hover:text-white"
        >
          <ArrowLeft size={18} />
          Retour
        </motion.button>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
            Disponibilités
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-extrabold text-white lg:text-3xl">
            <CalendarDays className="text-[#B3CFE5]" size={28} />
            Horaires et plannings
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#F6FAFD]/75">
            Consultez les heures d'ouverture de la clinique ainsi que les
            disponibilités hebdomadaires des médecins.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {/* Horaires clinique */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl lg:col-span-1"
          >
            <h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-white">
              <Building size={21} className="text-[#B3CFE5]" />
              Heures d'ouverture
            </h3>

            <div className="space-y-3">
              {cliniqueHoraires.map((item) => (
                <div
                  key={item.jour}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/45 p-3"
                >
                  <div>
                    <p className="text-sm font-bold text-white">
                      {item.jour}
                    </p>

                    <p className="mt-1 text-xs text-[#B3CFE5]">
                      {item.heures}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-extrabold ${
                      item.statut === "Fermé"
                        ? "border-red-400/20 bg-red-500/10 text-red-300"
                        : item.statut === "Urgence uniquement"
                        ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                        : "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {item.statut}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disponibilités médecins */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl lg:col-span-2"
          >
            <h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-white">
              <User size={21} className="text-[#B3CFE5]" />
              Disponibilités des médecins
            </h3>

            {/* Recherche */}
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-3.5 text-[#B3CFE5]"
                size={18}
              />

              <input
                type="text"
                placeholder="Rechercher un médecin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#B3CFE5]/50 focus:border-[#4A7FA7]/70"
              />
            </div>

            {/* Sélection médecin */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedDoctor("")}
                className={`whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-extrabold transition ${
                  selectedDoctor === ""
                    ? "border-[#B3CFE5]/30 bg-gradient-to-r from-[#1A3D63] to-[#4A7FA7] text-white"
                    : "border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5] hover:bg-[#1A3D63]"
                }`}
              >
                Vue d'ensemble
              </button>

              {filteredDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-extrabold transition ${
                    selectedDoctor === doc.id
                      ? "border-[#B3CFE5]/30 bg-gradient-to-r from-[#1A3D63] to-[#4A7FA7] text-white"
                      : "border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5] hover:bg-[#1A3D63]"
                  }`}
                >
                  Dr. {doc.name}
                </button>
              ))}
            </div>

            {/* Planning médecins */}
            <div className="space-y-4">
              {doctors
                .filter(
                  (doctor) =>
                    selectedDoctor === "" ||
                    doctor.id === selectedDoctor
                )
                .map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="rounded-[22px] border border-[#B3CFE5]/15 bg-[#0A1931]/45 p-4 transition hover:bg-[#1A3D63]/35"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-extrabold text-white">
                          Dr. {doc.name}
                        </h4>

                        <p className="mt-1 text-xs font-bold text-[#B3CFE5]">
                          {doc.specialite || "Médecine générale"}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-extrabold text-emerald-300">
                        <ShieldCheck size={12} />
                        Actif
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                      {joursSemaine.map((jour) => {
                        const estPresent =
                          jour !== "Samedi" || doc.id % 2 === 0;

                        return (
                          <div
                            key={jour}
                            className={`rounded-xl border p-2.5 text-center ${
                              estPresent
                                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                                : "border-[#B3CFE5]/10 bg-[#102A4B]/60 text-[#B3CFE5]/50"
                            }`}
                          >
                            <span className="text-xs font-extrabold">
                              {jour}
                            </span>

                            <span className="mt-1 flex items-center justify-center gap-1 text-[10px]">
                              <Clock size={10} />

                              {estPresent
                                ? "09:00 - 17:00"
                                : "Absent"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DispoSlots;
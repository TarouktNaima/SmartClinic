import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Brain,
  Bone,
  Stethoscope,
  Syringe,
  Eye,
  User,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import api from "../../api/axios";

function Specialites() {
  const navigate = useNavigate();

  const [specialitesData, setSpecialitesData] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = {
    HeartPulse,
    Brain,
    Bone,
    Stethoscope,
    Syringe,
    Eye,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [specResponse, docResponse] = await Promise.all([
          api.get("/specialites"),
          api.get("/doctors"),
        ]);

        const specs =
          specResponse.data.data !== undefined
            ? specResponse.data.data
            : specResponse.data;

        const docs =
          docResponse.data.data !== undefined
            ? docResponse.data.data
            : docResponse.data;

        setSpecialitesData(Array.isArray(specs) ? specs : []);
        setAllDoctors(Array.isArray(docs) ? docs : []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredDoctors = () => {
    if (!selectedSpecialite) return [];

    const selectedId = selectedSpecialite.id;

    const selectedName = String(
      selectedSpecialite.name || selectedSpecialite.nom || ""
    )
      .toLowerCase()
      .trim();

    return allDoctors.filter((doc) => {
      const docSpecId =
        doc.specialite_id ||
        doc.speciality_id ||
        (doc.specialite && doc.specialite.id);

      if (docSpecId && Number(docSpecId) === Number(selectedId)) {
        return true;
      }

      const docSpecName = String(
        typeof doc.specialite === "object"
          ? doc.specialite.name || doc.specialite.nom
          : doc.specialite || ""
      )
        .toLowerCase()
        .trim();

      return docSpecName === selectedName;
    });
  };

  const filteredDoctors = getFilteredDoctors();

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-10 text-white md:px-10 lg:px-16">
      {/* Background */}
      <div className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]" />

      <div className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* BUTTON RETOUR */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-3 rounded-2xl border border-[#B3CFE5]/20 bg-[#0F2745]/80 px-4 py-3 text-sm font-bold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20 backdrop-blur-xl transition hover:border-[#4A7FA7]/60 hover:bg-[#1A3D63] hover:text-white"
        >
          <ArrowLeft size={18} />
          Retour
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B3CFE5]">
            SmartClinic
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Spécialités médicales
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#B3CFE5]">
            Sélectionnez une spécialité pour afficher les médecins disponibles
            et réserver un rendez-vous.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#4A7FA7]" />
        </motion.div>

        {loading ? (
          <div className="mx-auto max-w-md rounded-[24px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-8 text-center text-sm font-bold text-[#B3CFE5] backdrop-blur-xl">
            Chargement des spécialités médicales...
          </div>
        ) : (
          <div className="w-full space-y-12">
            {/* Spécialités */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {specialitesData.map((item, index) => {
                const name = item.name || item.nom || "Spécialité";

                const desc =
                  item.desc ||
                  item.description ||
                  "Aucune description disponible.";

                const Icon = icons[item.icon] || HeartPulse;

                const isSelected = selectedSpecialite?.id === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08 * index,
                    }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedSpecialite(item)}
                    className={`group relative cursor-pointer overflow-hidden rounded-[26px] border p-7 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition ${
                      isSelected
                        ? "border-[#B3CFE5]/35 bg-gradient-to-br from-[#1A3D63] via-[#4A7FA7]/80 to-[#102A4B]"
                        : "border-[#B3CFE5]/20 bg-[#0F2745]/80 hover:border-[#4A7FA7]/60"
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B3CFE5]/15 blur-3xl transition group-hover:bg-[#B3CFE5]/25" />

                    <div
                      className={`absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-black shadow-lg ${
                        isSelected
                          ? "bg-white text-[#0A1931]"
                          : "bg-[#102A4B] text-[#B3CFE5]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-7 flex flex-col items-center text-center">
                      <div
                        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border transition ${
                          isSelected
                            ? "border-white/25 bg-white/10 text-white"
                            : "border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5] group-hover:bg-[#1A3D63]"
                        }`}
                      >
                        <Icon size={34} strokeWidth={1.5} />
                      </div>

                      <h3 className="mb-2 text-xl font-extrabold text-white">
                        {name}
                      </h3>

                      <p className="mb-6 line-clamp-2 text-sm leading-6 text-[#B3CFE5]">
                        {desc}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/doctors/${name}`);
                        }}
                        className="flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#B3CFE5] transition hover:bg-[#1A3D63] hover:text-white"
                      >
                        Voir la page
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Médecins */}
            <AnimatePresence mode="wait">
              {selectedSpecialite && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl md:p-8"
                >
                  <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#B3CFE5]/15 pb-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                        Équipe médicale
                      </p>

                      <h3 className="text-2xl font-extrabold text-white">
                        Médecins en{" "}
                        {selectedSpecialite.name || selectedSpecialite.nom}
                      </h3>

                      <p className="mt-2 text-sm text-[#B3CFE5]">
                        {filteredDoctors.length} médecin(s) disponible(s) dans
                        cette spécialité.
                      </p>
                    </div>
                  </div>

                  {filteredDoctors.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#B3CFE5]/25 bg-[#0A1931]/45 p-10 text-center text-sm font-semibold text-[#B3CFE5]">
                      Aucun médecin n’est actuellement enregistré dans cette
                      spécialité.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDoctors.map((doc) => (
                        <motion.div
                          key={doc.id}
                          initial={{
                            opacity: 0,
                            scale: 0.96,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          whileHover={{ y: -5 }}
                          className="rounded-[24px] border border-[#B3CFE5]/20 bg-[#0A1931]/55 p-6 shadow-lg transition hover:bg-[#1A3D63]/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5]">
                              <User size={23} />
                            </div>

                            <div>
                              <h4 className="text-lg font-extrabold text-white">
                                Dr. {doc.name}
                              </h4>

                              <p className="mt-1 inline-block rounded-lg bg-[#4A7FA7]/20 px-2 py-1 text-[11px] font-bold text-[#B3CFE5]">
                                {selectedSpecialite.name ||
                                  selectedSpecialite.nom}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-[#B3CFE5]/15 pt-4">
                            <div className="flex items-center gap-2 truncate text-sm text-[#B3CFE5]">
                              <Mail size={15} />

                              <span className="truncate">
                                {doc.email || "contact@smartclinic.com"}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              navigate("/reserver-rdv", {
                                state: {
                                  doctorId: doc.id,
                                },
                              })
                            }
                            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3 text-xs font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25 transition hover:scale-[1.01]"
                          >
                            Réserver un rendez-vous
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Specialites;
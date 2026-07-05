import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  CalendarCheck,
  Stethoscope,
  Mail,
} from "lucide-react";

function DoctorsBySpecialite() {
  const { specialite } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        const data = res.data.doctors || res.data.data || res.data || [];

        const filtered = data.filter(
          (doc) =>
            String(doc.specialite || "")
              .toLowerCase()
              .trim() === String(specialite || "").toLowerCase().trim()
        );

        setDoctors(filtered);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialite]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-10 text-white md:px-10 lg:px-16">
      <div className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/75 px-4 py-3 text-sm font-bold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/25 backdrop-blur-xl transition hover:bg-[#1A3D63] hover:text-white"
        >
          <ArrowLeft size={18} />
          Retour
        </motion.button>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-7 shadow-2xl shadow-[#0A1931]/40"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B3CFE5]">
            SmartClinic
          </p>

          <h1 className="text-3xl font-extrabold text-white md:text-4xl">
            Spécialistes
            <span className="block text-[#B3CFE5]">{specialite}</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
            Consultez les médecins disponibles dans cette spécialité et
            choisissez le professionnel qui vous convient.
          </p>
        </motion.header>

        {loading ? (
          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-10 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
            <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#B3CFE5]/15 border-t-[#B3CFE5]" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
              Chargement des médecins...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.length > 0 ? (
              doctors.map((doc, idx) => (
                <motion.div
                  key={doc.id || doc._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 text-center shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition hover:border-[#4A7FA7]/60"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B3CFE5]/15 blur-3xl transition group-hover:bg-[#B3CFE5]/25" />

                  <div className="relative z-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5] shadow-lg shadow-[#0A1931]/30 transition group-hover:bg-[#1A3D63]">
                      <User size={36} strokeWidth={1.5} />
                    </div>

                    <h4 className="text-xl font-extrabold text-white">
                      Dr. {doc.name}
                    </h4>

                    <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-3 py-2 text-xs font-bold text-[#B3CFE5]">
                      <Stethoscope size={14} />
                      {doc.specialite || specialite}
                    </div>

                   

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() =>
                        navigate("/reserver-rdv", { state: { doctor: doc } })
                      }
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25 transition hover:scale-[1.01]"
                    >
                      <CalendarCheck size={17} />
                      Prendre rendez-vous
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full rounded-[26px] border border-dashed border-[#B3CFE5]/25 bg-[#0F2745]/80 p-12 text-center shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5]">
                  <User size={32} />
                </div>

                <p className="text-lg font-extrabold text-white">
                  Aucun médecin trouvé pour cette spécialité.
                </p>

                <p className="mt-2 text-sm text-[#B3CFE5]">
                  Veuillez choisir une autre spécialité ou revenir plus tard.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsBySpecialite;
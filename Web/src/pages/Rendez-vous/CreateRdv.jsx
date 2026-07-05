import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Brain,
  Bone,
  Stethoscope,
  Syringe,
  Eye,
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";
import api from "../../api/axios";

function CreateRdv() {
  const navigate = useNavigate();
  const location = useLocation();

  const icons = { HeartPulse, Brain, Bone, Stethoscope, Syringe, Eye };

  const [specialites, setSpecialites] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [selectedSpecialite, setSelectedSpecialite] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resSpecs = await api.get("/specialities");
      const resDocs = await api.get("/doctors");

      setSpecialites(resSpecs.data.data || resSpecs.data || []);
      setDoctors(resDocs.data.data || resDocs.data || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.doctor) {
      setSelectedDoctor(location.state.doctor);
      setSelectedSpecialite(location.state.doctor.specialite);
    }
  }, [location.state]);

  useEffect(() => {
    if (!selectedSpecialite) return setFilteredDoctors([]);

    const filtered = doctors.filter(
      (d) =>
        String(d.specialite).toLowerCase().trim() ===
        String(selectedSpecialite).toLowerCase().trim()
    );

    setFilteredDoctors(filtered);
  }, [selectedSpecialite, doctors]);

  useEffect(() => {
    if (!selectedDoctor || !date) return;

    const fetchSlots = async () => {
      const res = await api.get(
        `/slots/available?doctor_id=${selectedDoctor.id}&date=${date}`
      );

      setAvailableSlots(res.data.data || res.data || []);
    };

    fetchSlots();
  }, [selectedDoctor, date]);

  const resetForm = () => {
    setSelectedSpecialite("");
    setSelectedDoctor(null);
    setDate("");
    setHeure("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-10 text-white md:px-10 lg:px-16">
      <div className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/75 px-4 py-3 text-sm font-bold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/25 backdrop-blur-xl transition hover:bg-[#1A3D63] hover:text-white"
        >
          <ArrowLeft size={18} />
          Retour
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-7 shadow-2xl shadow-[#0A1931]/40"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B3CFE5]">
                SmartClinic
              </p>

              <h1 className="text-3xl font-extrabold text-white md:text-4xl">
                Prendre un
                <span className="block text-[#B3CFE5]">rendez-vous</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
                Choisissez une spécialité, sélectionnez un médecin, puis
                confirmez la date et l’heure disponibles.
              </p>
            </div>

            {(selectedSpecialite || selectedDoctor) && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 py-3 text-sm font-bold text-[#B3CFE5] transition hover:bg-[#1A3D63] hover:text-white"
              >
                <ArrowLeft size={16} />
                Réinitialiser
              </button>
            )}
          </div>
        </motion.div>

        {!selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {specialites.map((s, i) => {
              const Icon = icons[s.icon] || HeartPulse;
              const name = s.name || s.nom || "Spécialité";
              const isSelected = selectedSpecialite === name;

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedSpecialite(name)}
                  className={`group relative cursor-pointer overflow-hidden rounded-[26px] border p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition ${
                    isSelected
                      ? "border-[#B3CFE5]/35 bg-gradient-to-br from-[#1A3D63] via-[#4A7FA7]/80 to-[#102A4B]"
                      : "border-[#B3CFE5]/20 bg-[#0F2745]/80 hover:border-[#4A7FA7]/60"
                  }`}
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B3CFE5]/15 blur-3xl transition group-hover:bg-[#B3CFE5]/25" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 text-[#B3CFE5]">
                      <Icon size={30} strokeWidth={1.6} />
                    </div>

                    <h3 className="text-xl font-extrabold text-white">
                      {name}
                    </h3>

                    <p className="mt-2 text-sm text-[#B3CFE5]">
                      Choisir cette spécialité
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {selectedSpecialite && !selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Médecins disponibles
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                {selectedSpecialite}
              </h2>
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#B3CFE5]/25 bg-[#0A1931]/45 p-8 text-center text-sm font-semibold text-[#B3CFE5]">
                Aucun médecin disponible pour cette spécialité.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredDoctors.map((d) => (
                  <motion.div
                    key={d.id}
                    whileHover={{ x: 6 }}
                    onClick={() => setSelectedDoctor(d)}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 p-5 transition hover:bg-[#1A3D63]/60"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5]">
                        <User size={22} />
                      </div>

                      <div>
                        <p className="font-extrabold text-white">
                          Dr. {d.name}
                        </p>
                        <p className="text-sm text-[#B3CFE5]">
                          {d.specialite}
                        </p>
                      </div>
                    </div>

                    <CalendarDays size={20} className="text-[#B3CFE5]" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1fr]"
          >
            <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Médecin sélectionné
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5]">
                  <User size={30} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-white">
                    Dr. {selectedDoctor.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#B3CFE5]">
                    {selectedDoctor.specialite}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/45 p-4">
                <p className="text-sm leading-6 text-[#B3CFE5]">
                  Sélectionnez une date, puis choisissez une heure disponible
                  pour confirmer votre rendez-vous.
                </p>
              </div>
            </div>

            <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Informations du rendez-vous
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#B3CFE5]">
                    Date du rendez-vous
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70">
                    <CalendarDays size={18} className="text-[#B3CFE5]" />

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setHeure("");
                      }}
                      className="w-full bg-transparent py-3.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                {date && (
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#B3CFE5]">
                      Heure disponible
                    </label>

                    <div className="flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70">
                      <Clock size={18} className="text-[#B3CFE5]" />

                      <select
                        value={heure}
                        onChange={(e) => setHeure(e.target.value)}
                        className="w-full bg-transparent py-3.5 text-sm text-white outline-none"
                      >
                        <option value="" className="bg-[#0A1931]">
                          Choisir une heure
                        </option>

                        {availableSlots.map((t) => (
                          <option key={t} value={t} className="bg-[#0A1931]">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <button
                  disabled={!heure}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3.5 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarDays size={18} />
                  Confirmer le rendez-vous
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CreateRdv;
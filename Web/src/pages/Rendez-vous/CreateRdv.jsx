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
  ArrowRight,
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

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      const resSpecs = await api.get("/specialities");
      const resDocs = await api.get("/doctors");

      setSpecialites(resSpecs.data.data || resSpecs.data || []);
      setDoctors(resDocs.data.data || resDocs.data || []);
    };

    fetchData();
  }, []);

  // PREFILL
  useEffect(() => {
    if (location.state?.doctor) {
      setSelectedDoctor(location.state.doctor);
      setSelectedSpecialite(location.state.doctor.specialite);
    }
  }, [location.state]);

  // FILTER DOCTORS
  useEffect(() => {
    if (!selectedSpecialite) return setFilteredDoctors([]);

    const filtered = doctors.filter(
      (d) =>
        String(d.specialite).toLowerCase().trim() ===
        String(selectedSpecialite).toLowerCase().trim()
    );

    setFilteredDoctors(filtered);
  }, [selectedSpecialite, doctors]);

  // SLOTS
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07101f] text-white px-6 py-10">

      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Prendre un{" "}
            <span className="text-indigo-300">Rendez-vous</span>
          </h1>

          {(selectedSpecialite || selectedDoctor) && (
            <button
              onClick={() => {
                setSelectedSpecialite("");
                setSelectedDoctor(null);
                setDate("");
                setHeure("");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >
              <ArrowLeft size={16} />
              Reset
            </button>
          )}
        </div>

        {/* STEP 1: SPECIALITES */}
        {!selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {specialites.map((s, i) => {
              const Icon = icons[s.icon] || HeartPulse;

              return (
                <motion.div
                  key={s.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedSpecialite(s.name)}
                  className="cursor-pointer p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-indigo-400/30 transition"
                >
                  <Icon className="text-indigo-300 mb-4" size={38} />

                  <h3 className="text-lg font-bold">{s.name}</h3>

                  <p className="text-sm text-slate-400 mt-2">
                    Choisir cette spécialité
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* STEP 2: DOCTORS */}
        {selectedSpecialite && !selectedDoctor && (
          <div className="mt-10 grid gap-4">
            {filteredDoctors.map((d) => (
              <motion.div
                key={d.id}
                whileHover={{ x: 8 }}
                onClick={() => setSelectedDoctor(d)}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-indigo-400/30"
              >
                <p className="font-bold">Dr. {d.name}</p>
                <p className="text-sm text-slate-400">{d.specialite}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* STEP 3: FORM */}
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold mb-6">
              Dr. {selectedDoctor.name}
            </h2>

            <div className="space-y-4">

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10"
              />

              {date && (
                <select
                  value={heure}
                  onChange={(e) => setHeure(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/10"
                >
                  <option value="">Choisir heure</option>
                  {availableSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}

              <button
                disabled={!heure}
                className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 transition font-bold"
              >
                Confirmer le rendez-vous
              </button>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default CreateRdv;
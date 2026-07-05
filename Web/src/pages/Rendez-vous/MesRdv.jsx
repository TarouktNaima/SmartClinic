import { useState, useEffect } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Calendar,
  Clock,
  User,
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  CalendarDays,
} from "lucide-react";

function RdvList() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const res = await api.get("/rendezvous");
      const data = res.data.data !== undefined ? res.data.data : res.data;
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur de chargement des rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    let result = appointments;

    if (statusFilter !== "Tous") {
      result = result.filter(
        (a) => a.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      const q = search.toLowerCase();

      result = result.filter(
        (a) =>
          a.patient?.name?.toLowerCase().includes(q) ||
          a.doctor?.name?.toLowerCase().includes(q)
      );
    }

    setFilteredAppointments(result);
  }, [search, statusFilter, appointments]);

  const handleConfirm = async (id) => {
    try {
      await api.put(`/rendezvous/${id}/confirm`);
      toast.success("Rendez-vous confirmé");
      fetchAppointments();
    } catch {
      toast.error("Erreur confirmation");
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.put(`/rendezvous/${id}/cancel`);
      toast.success("Rendez-vous annulé");
      fetchAppointments();
    } catch {
      toast.error("Erreur annulation");
    }
  };

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmé":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-400/20";
      case "annulé":
        return "bg-red-500/10 text-red-300 border-red-400/20";
      default:
        return "bg-amber-500/10 text-amber-300 border-amber-400/20";
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-8 text-white md:px-10">
      <Toaster position="top-center" />

      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
      />

      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
            Gestion des rendez-vous
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-extrabold text-white lg:text-3xl">
            <CalendarDays className="text-[#B3CFE5]" size={28} />
            Registre des rendez-vous
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
            Gérez les consultations, validez les rendez-vous et suivez leur
            statut.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-3.5 text-[#B3CFE5]"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un patient ou un médecin..."
              className="w-full rounded-xl border border-[#B3CFE5]/20 bg-[#0F2745]/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#B3CFE5]/50 focus:border-[#4A7FA7]/70"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["Tous", "En attente", "Confirmé", "Annulé"].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                  statusFilter === filter
                    ? "border-[#B3CFE5]/30 bg-gradient-to-r from-[#1A3D63] to-[#4A7FA7] text-white shadow-lg shadow-[#4A7FA7]/15"
                    : "border-[#B3CFE5]/20 bg-[#0F2745]/80 text-[#B3CFE5] hover:bg-[#1A3D63]"
                }`}
              >
                {filter}
              </button>
            ))}

            <button
              onClick={fetchAppointments}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#0F2745]/80 text-[#B3CFE5] transition hover:bg-[#1A3D63]"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-8 text-center text-sm font-bold text-[#B3CFE5]">
            Chargement des rendez-vous...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-[#B3CFE5]/25 bg-[#0F2745]/80 p-10 text-center text-sm font-bold text-[#B3CFE5]">
            Aucun rendez-vous trouvé.
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -3 }}
                className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-5 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5]">
                      <User size={22} />
                    </div>

                    <div>
                      <h3 className="font-extrabold text-white">
                        {appointment.patient?.name || "Patient"}
                      </h3>

                      <p className="text-sm text-[#B3CFE5]">
                        Dr. {appointment.doctor?.name || "Médecin"} •{" "}
                        {appointment.doctor?.specialite || "Spécialité"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-[#B3CFE5]">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} />
                      {appointment.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={15} />
                      {appointment.heure}
                    </span>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status || "En attente"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(appointment.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <CheckCircle size={17} />
                    </button>

                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                    >
                      <XCircle size={17} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RdvList;
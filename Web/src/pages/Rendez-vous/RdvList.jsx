import { useState, useEffect } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Search,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
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
      toast.error("Erreur chargement rendez-vous");
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
    await api.put(`/rendezvous/${id}/confirm`);
    toast.success("Confirmé");
    fetchAppointments();
  };

  const handleCancel = async (id) => {
    await api.put(`/rendezvous/${id}/cancel`);
    toast.error("Annulé");
    fetchAppointments();
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
    <div className="min-h-screen bg-[#07101f] text-white p-6 md:p-10 relative overflow-hidden">
      <Toaster />

      {/* GLOW BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold">
            Registre des Rendez-vous 📋
          </h1>
          <p className="text-white/50 mt-2">
            Gestion des consultations médicales
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* SEARCH */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3 text-white/40" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher patient ou médecin..."
              className="w-full pl-10 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 flex-wrap">
            {["Tous", "En attente", "Confirmé", "Annulé"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm border transition ${
                  statusFilter === f
                    ? "bg-indigo-500 text-white border-indigo-400"
                    : "bg-white/5 text-white/60 border-white/10"
                }`}
              >
                {f}
              </button>
            ))}

            <button
              onClick={fetchAppointments}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <p className="text-white/50">Chargement...</p>
        ) : (
          <div className="grid gap-5">

            {filteredAppointments.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* PATIENT */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                      <User />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {a.patient?.name}
                      </h3>
                      <p className="text-sm text-white/50">
                        Dr. {a.doctor?.name}
                      </p>
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="flex gap-6 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} /> {a.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} /> {a.heure}
                    </span>
                  </div>

                  {/* STATUS */}
                  <span className={`px-3 py-1 rounded-full text-xs border ${statusStyle(a.status)}`}>
                    {a.status}
                  </span>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(a.id)}
                      className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-300"
                    >
                      <CheckCircle size={14} />
                    </button>

                    <button
                      onClick={() => handleCancel(a.id)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 text-red-300"
                    >
                      <XCircle size={14} />
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
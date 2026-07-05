import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Stethoscope, CalendarDays, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import LoadingSpinner from "./LoadingSpinner";
import DashboardChart from "./DashboardChart";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    rendezvous: 0,
  });

  const [latestDoctors, setLatestDoctors] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const role = user.role || localStorage.getItem("role") || "admin";

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (role === "patient") {
      navigate("/specialities");
      return;
    }

    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setStats({
        patients: response.data.patients || 0,
        doctors: response.data.doctors || 0,
        rendezvous: response.data.rendezvous || 0,
      });

      setLatestDoctors(response.data.latest_doctors || []);
      setLatestUsers(response.data.latest_users || []);
    } catch (error) {
      setErrorPage(true);
      toast.error("Erreur lors du chargement du dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (errorPage) {
    return <ErrorState message="Impossible de charger le dashboard." />;
  }

  return (
  <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
    <div className="relative flex min-h-screen">
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

      <Sidebar />

      <main className="relative z-10 flex-1 p-5 lg:p-8">
        <Header user={user} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                  Tableau de bord SmartClinic
                </p>

                <h1 className="text-2xl font-extrabold text-white">
                  Vue générale de la clinique
                </h1>

                <p className="mt-2 text-sm text-[#F6FAFD]/75">
                  {role === "secretary"
                    ? "Consultez les statistiques principales de SmartClinic."
                    : "Gérez les données de votre clinique de manière professionnelle."}
                </p>
              </div>

              {role === "admin" && (
                <Link
                  to="/add-doctor"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#4A7FA7]/25 transition hover:scale-[1.02]"
                >
                  <PlusCircle size={19} />
                  Ajouter un médecin
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              title="Patients"
              value={stats.patients}
              icon={Users}
              color="bg-[#4A7FA7]"
              trend="+12% ce mois-ci"
            />

            <StatCard
              title="Médecins"
              value={stats.doctors}
              icon={Stethoscope}
              color="bg-[#1A3D63]"
              trend="+8% ce mois-ci"
            />

            <StatCard
              title="Rendez-vous"
              value={stats.rendezvous}
              icon={CalendarDays}
              color="bg-[#B3CFE5]"
              trend="+5% ce mois-ci"
            />
          </div>

          <div className="mt-7 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-5 text-white shadow-2xl shadow-[#0A1931]/30 backdrop-blur-xl">
            <DashboardChart
              patients={stats.patients}
              doctors={stats.doctors}
              rendezvous={stats.rendezvous}
            />
          </div>

          {role === "admin" && (
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 text-white shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
                <h3 className="mb-5 text-lg font-extrabold text-white">
                  Derniers médecins
                </h3>

                {latestDoctors.length === 0 ? (
                  <EmptyState text="Aucun médecin trouvé pour le moment." />
                ) : (
                  <div className="space-y-4">
                    {latestDoctors.slice(0, 5).map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex items-center gap-4 rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/55 p-4 shadow-sm transition hover:-translate-y-1 hover:bg-[#1A3D63]/70"
                      >
                        <img
                          src={
                            doctor.photo
                              ? `http://127.0.0.1:8000/storage/doctors/${doctor.photo}`
                              : `https://ui-avatars.com/api/?name=${doctor.name}`
                          }
                          alt={doctor.name}
                          className="h-12 w-12 rounded-2xl object-cover"
                        />

                        <div>
                          <p className="font-bold text-white">
                            {doctor.name}
                          </p>
                          <p className="text-sm text-[#B3CFE5]">
                            {doctor.specialite || "Spécialité"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 text-white shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
                <h3 className="mb-5 text-lg font-extrabold text-white">
                  Derniers utilisateurs
                </h3>

                {latestUsers.length === 0 ? (
                  <EmptyState text="Aucun utilisateur trouvé pour le moment." />
                ) : (
                  <div className="space-y-4">
                    {latestUsers.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/55 p-4 shadow-sm transition hover:-translate-y-1 hover:bg-[#1A3D63]/70"
                      >
                        <img
                          src={`https://ui-avatars.com/api/?name=${item.name}`}
                          alt={item.name}
                          className="h-12 w-12 rounded-2xl"
                        />

                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-sm text-[#B3CFE5]">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  </div>
);
}
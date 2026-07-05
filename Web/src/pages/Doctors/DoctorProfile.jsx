import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Stethoscope,
  ShieldCheck,
  UserRound,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

export default function DoctorProfile() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    getDoctorProfile();
  }, []);

  const getDoctorProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      let doctorData = null;

      try {
        const profileResponse = await api.get("/doctor/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        doctorData =
          profileResponse.data?.doctor ||
          profileResponse.data?.data ||
          profileResponse.data;
      } catch (profileError) {
        console.log("PROFILE ERROR:", profileError.response?.data || profileError);
      }

      const doctorsResponse = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      let doctors = [];

      if (Array.isArray(doctorsResponse.data)) {
        doctors = doctorsResponse.data;
      } else if (Array.isArray(doctorsResponse.data?.doctors)) {
        doctors = doctorsResponse.data.doctors;
      } else if (Array.isArray(doctorsResponse.data?.data)) {
        doctors = doctorsResponse.data.data;
      }

      const userEmail = user.email ? user.email.trim().toLowerCase() : "";

      const userName = user.name
        ? user.name.replace(/^dr\.?\s*/i, "").trim().toLowerCase()
        : "";

      const matchedDoctor = doctors.find((item) => {
        const doctorEmail = item.email ? item.email.trim().toLowerCase() : "";

        const doctorName = item.name
          ? item.name.replace(/^dr\.?\s*/i, "").trim().toLowerCase()
          : "";

        const sameEmail =
          userEmail !== "" && doctorEmail !== "" && doctorEmail === userEmail;

        const sameUserId =
          user.id && item.user_id && Number(item.user_id) === Number(user.id);

        const sameName =
          userName !== "" && doctorName !== "" && doctorName === userName;

        return sameEmail || sameUserId || sameName;
      });

      if (matchedDoctor) {
        doctorData = {
          ...doctorData,
          ...matchedDoctor,
        };
      }

      if (!doctorData) {
        doctorData = {
          name: user.name,
          email: user.email,
          specialite: null,
          phone: null,
          photo: null,
        };
      }

      setDoctor(doctorData);
    } catch (error) {
      console.log("DOCTOR PROFILE ERROR:", error.response?.data || error);
      toast.error("Impossible de charger le profil");
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = () => {
    if (!doctor?.photo) return null;

    if (
      doctor.photo.startsWith("http://") ||
      doctor.photo.startsWith("https://")
    ) {
      return doctor.photo;
    }

    if (doctor.photo.startsWith("doctors/")) {
      return `http://127.0.0.1:8000/storage/${doctor.photo}`;
    }

    return `http://127.0.0.1:8000/storage/doctors/${doctor.photo}`;
  };

  const photoUrl = getPhotoUrl();

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A1931]">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-[#B3CFE5]/20 border-t-[#B3CFE5]"
        />
      </div>
    );
  }

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

        <div className="relative z-10">
          <header className="border-b border-[#B3CFE5]/15 bg-[#0A1931]/75 px-5 py-4 backdrop-blur-xl lg:px-10">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/doctor-dashboard")}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20 transition hover:bg-[#1A3D63] hover:text-white"
                >
                  <ArrowLeft size={20} />
                </motion.button>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B3CFE5]">
                    SmartClinic
                  </p>

                  <h1 className="text-xl font-extrabold text-white">
                    Profil médecin
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <Activity size={16} />
                Compte actif
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Espace médecin
              </p>

              <h2 className="text-2xl font-extrabold text-white lg:text-3xl">
                Informations du profil
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
                Consultez vos informations professionnelles enregistrées dans
                SmartClinic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="grid gap-8 lg:grid-cols-[420px_1fr]"
            >
              <div className="relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-8 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4A7FA7]/20 blur-[90px]" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div whileHover={{ scale: 1.04 }} className="relative">
                    <div className="absolute inset-0 rounded-[36px] bg-[#4A7FA7]/25 blur-3xl" />

                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={doctor?.name || "Médecin"}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="relative h-48 w-48 rounded-[36px] border border-[#B3CFE5]/25 object-cover shadow-2xl"
                      />
                    ) : (
                      <div className="relative flex h-48 w-48 items-center justify-center rounded-[36px] border border-[#B3CFE5]/25 bg-[#102A4B] shadow-2xl">
                        <UserRound
                          size={80}
                          strokeWidth={1}
                          className="text-[#B3CFE5]"
                        />
                      </div>
                    )}

                    <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#0F2745] bg-emerald-500 text-white">
                      <ShieldCheck size={22} />
                    </div>
                  </motion.div>

                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#B3CFE5]">
                    Professionnel médical
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold text-white">
                    Dr. {doctor?.name || user.name || "Médecin"}
                  </h2>

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 py-2 text-sm font-bold text-[#B3CFE5]">
                    <Stethoscope size={17} />
                    {doctor?.specialite || "Médecin"}
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-8 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl lg:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                    Informations professionnelles
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-white">
                    Détails personnels
                  </h3>

                  <p className="mt-3 text-sm text-[#F6FAFD]/65">
                    Informations liées à votre compte médical et professionnel.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  <InfoCard
                    icon={UserRound}
                    label="Nom complet"
                    value={`Dr. ${doctor?.name || user.name || "N/A"}`}
                  />

                  <InfoCard
                    icon={Stethoscope}
                    label="Spécialité"
                    value={doctor?.specialite || "N/A"}
                  />

                  <InfoCard
                    icon={Mail}
                    label="Adresse e-mail"
                    value={doctor?.email || user.email || "N/A"}
                  />

                  <InfoCard
                    icon={Phone}
                    label="Téléphone"
                    value={doctor?.phone || "N/A"}
                  />

                  <InfoCard
                    icon={ShieldCheck}
                    label="Rôle du compte"
                    value={user.role || "doctor"}
                  />

                  <InfoCard
                    icon={Activity}
                    label="Statut du compte"
                    value="Actif"
                  />
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group rounded-[22px] border border-[#B3CFE5]/20 bg-[#0A1931]/55 p-5 transition hover:border-[#4A7FA7]/60 hover:bg-[#1A3D63]/40"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]">
          <Icon size={21} className="text-[#B3CFE5]" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B3CFE5]/70">{label}</p>

          <p className="mt-1 break-words font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
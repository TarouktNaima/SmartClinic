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

        console.log("PROFILE RESPONSE:", profileResponse.data);

        doctorData =
          profileResponse.data?.doctor ||
          profileResponse.data?.data ||
          profileResponse.data;
      } catch (profileError) {
        console.log(
          "PROFILE ERROR:",
          profileError.response?.data || profileError
        );
      }

      const doctorsResponse = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("DOCTORS RESPONSE:", doctorsResponse.data);

      let doctors = [];

      if (Array.isArray(doctorsResponse.data)) {
        doctors = doctorsResponse.data;
      } else if (Array.isArray(doctorsResponse.data?.doctors)) {
        doctors = doctorsResponse.data.doctors;
      } else if (Array.isArray(doctorsResponse.data?.data)) {
        doctors = doctorsResponse.data.data;
      }

      const userEmail = user.email
        ? user.email.trim().toLowerCase()
        : "";

      const userName = user.name
        ? user.name
            .replace(/^dr\.?\s*/i, "")
            .trim()
            .toLowerCase()
        : "";

      const matchedDoctor = doctors.find((item) => {
        const doctorEmail = item.email
          ? item.email.trim().toLowerCase()
          : "";

        const doctorName = item.name
          ? item.name
              .replace(/^dr\.?\s*/i, "")
              .trim()
              .toLowerCase()
          : "";

        const sameEmail =
          userEmail !== "" &&
          doctorEmail !== "" &&
          doctorEmail === userEmail;

        const sameUserId =
          user.id &&
          item.user_id &&
          Number(item.user_id) === Number(user.id);

        const sameName =
          userName !== "" &&
          doctorName !== "" &&
          doctorName === userName;

        return sameEmail || sameUserId || sameName;
      });

      console.log("MATCHED DOCTOR:", matchedDoctor);

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
      console.log(
        "DOCTOR PROFILE ERROR:",
        error.response?.data || error
      );

      toast.error("Impossible de charger le profil");
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = () => {
    if (!doctor?.photo) {
      return null;
    }

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
      <div className="flex min-h-screen items-center justify-center bg-[#07101f]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-400"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07101f] text-white">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]"
      />

      <div className="relative z-10">
        <header className="border-b border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-2xl lg:px-12">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/doctor-dashboard")}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={20} />
              </motion.button>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">
                  SmartClinic
                </p>

                <h1 className="text-xl font-bold">
                  Doctor Profile
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <Activity size={16} />
              Active Account
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-[420px_1fr]"
          >
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-[40px] bg-indigo-500/30 blur-3xl" />

                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={doctor?.name || "Doctor"}
                      onError={(e) => {
                        console.log(
                          "PHOTO ERROR:",
                          e.currentTarget.src
                        );

                        e.currentTarget.style.display = "none";
                      }}
                      className="relative h-48 w-48 rounded-[40px] border border-white/20 object-cover shadow-2xl"
                    />
                  ) : (
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-[40px] border border-white/20 bg-indigo-500/10 shadow-2xl">
                      <UserRound
                        size={80}
                        strokeWidth={1}
                        className="text-indigo-200"
                      />
                    </div>
                  )}

                  <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#07101f] bg-emerald-500">
                    <ShieldCheck size={22} />
                  </div>
                </motion.div>

                <p className="mt-8 text-sm uppercase tracking-[0.3em] text-indigo-300">
                  Medical Professional
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Dr. {doctor?.name || user.name || "Doctor"}
                </h2>

                <div className="mt-4 flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-indigo-200">
                  <Stethoscope size={17} />

                  {doctor?.specialite || "Doctor"}
                </div>
              </div>
            </div>

            <div className="rounded-[40px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl lg:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
                  Professional Information
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  Personal Details
                </h3>

                <p className="mt-3 text-slate-400">
                  Your professional and medical account information.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <InfoCard
                  icon={UserRound}
                  label="Full Name"
                  value={`Dr. ${
                    doctor?.name ||
                    user.name ||
                    "N/A"
                  }`}
                />

                <InfoCard
                  icon={Stethoscope}
                  label="Speciality"
                  value={doctor?.specialite || "N/A"}
                />

                <InfoCard
                  icon={Mail}
                  label="Email Address"
                  value={
                    doctor?.email ||
                    user.email ||
                    "N/A"
                  }
                />

                <InfoCard
                  icon={Phone}
                  label="Phone Number"
                  value={doctor?.phone || "N/A"}
                />

                <InfoCard
                  icon={ShieldCheck}
                  label="Account Role"
                  value={user.role || "doctor"}
                />

                <InfoCard
                  icon={Activity}
                  label="Account Status"
                  value="Active"
                />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-indigo-400/20 hover:bg-white/[0.07]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
          <Icon
            size={21}
            className="text-indigo-200"
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-1 break-words font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  UserRound,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  HeartPulse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

export default function AddAdmin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        name,
        email,
        password,
        role: "admin",
      });

      toast.success("Administrateur ajouté avec succès");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

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
            className="mx-auto max-w-5xl"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-6 flex items-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/70 px-4 py-3 text-sm font-bold text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20 transition hover:bg-[#1A3D63] hover:text-white"
            >
              <ArrowLeft size={18} />
              Retour
            </button>

            <div className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Gestion des administrateurs
              </p>

              <h1 className="text-2xl font-extrabold text-white lg:text-3xl">
                Ajouter un administrateur
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
                Créez un compte administrateur avec les droits nécessaires pour
                gérer SmartClinic.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.9fr_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-7 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#4A7FA7]/20 blur-[100px]" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 text-[#B3CFE5]">
                    <Shield size={28} />
                  </div>

                  <h2 className="mb-3 text-2xl font-extrabold text-white">
                    Accès sécurisé
                  </h2>

                  <p className="text-sm leading-6 text-[#B3CFE5]">
                    L’administrateur peut gérer les utilisateurs, les médecins,
                    les rendez-vous et les paramètres principaux de la clinique.
                  </p>

                  <div className="mt-10 flex justify-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative flex h-56 w-56 items-center justify-center rounded-[36px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#102A4B] to-[#1A3D63] shadow-2xl"
                    >
                      <div className="absolute inset-0 rounded-[36px] bg-[#4A7FA7]/20 blur-3xl" />
                      <HeartPulse
                        size={85}
                        className="relative text-[#B3CFE5]"
                        strokeWidth={1.4}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-7 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                  Nouveau compte
                </p>

                <h2 className="mb-7 mt-2 text-2xl font-extrabold text-white">
                  Informations administrateur
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputBox
                    icon={UserRound}
                    placeholder="Nom de l’administrateur"
                    value={name}
                    setValue={setName}
                  />

                  <InputBox
                    icon={Mail}
                    type="email"
                    placeholder="Email de l’administrateur"
                    value={email}
                    setValue={setEmail}
                  />

                  <InputBox
                    icon={Lock}
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    setValue={setPassword}
                  />

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3.5 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25"
                  >
                    <motion.span
                      animate={{ x: ["-120%", "140%"] }}
                      transition={{
                        duration: 2.3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 w-24 bg-white/25 blur-xl"
                    />

                    <UserPlus size={19} />
                    Ajouter l’administrateur
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function InputBox({ icon: Icon, type = "text", placeholder, value, setValue }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70 focus-within:ring-2 focus-within:ring-[#B3CFE5]/20">
      <Icon size={18} className="text-[#B3CFE5]" />

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#B3CFE5]/45"
      />
    </div>
  );
}
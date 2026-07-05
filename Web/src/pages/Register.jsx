import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  LogIn,
  CalendarDays,
  Users,
  BarChart3,
  ShieldCheck,
  HeartPulse,
  Sparkles,
} from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toastStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    color: "#0A1931",
    borderRadius: "14px",
    border: "1px solid rgba(179, 207, 229, 0.7)",
    fontWeight: "600",
    fontSize: "13px",
    padding: "12px 18px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Création de votre compte...");

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      toast.success("Compte créé avec succès ! 🎉", {
        id: loadingToast,
        style: toastStyle,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err.response?.data);

      toast.error("Erreur lors de l'inscription ❌", {
        id: loadingToast,
        style: {
          ...toastStyle,
          color: "#b91c1c",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
      });
    }
  };

  const features = [
    {
      icon: CalendarDays,
      title: "Rendez-vous",
      text: "Organisez les consultations",
    },
    {
      icon: Users,
      title: "Espace médical",
      text: "Accès simple et rapide",
    },
    {
      icon: BarChart3,
      title: "Gestion",
      text: "Suivi clair du cabinet",
    },
    {
      icon: ShieldCheck,
      title: "Protection",
      text: "Données bien sécurisées",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
      <Toaster position="top-center" />

      <div className="relative flex min-h-screen items-center justify-center p-2 lg:p-3">
        <motion.div
          animate={{ x: [0, 65, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[360px] w-[360px] rounded-full bg-[#1A3D63]/60 blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, -55, 0], y: [0, 45, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-[360px] w-[360px] rounded-full bg-[#4A7FA7]/50 blur-[120px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 grid w-full max-w-[900px] overflow-hidden rounded-[24px] border border-[#B3CFE5]/20 bg-[#0A1931] shadow-2xl lg:grid-cols-[1fr_0.9fr]"
        >
          {/* Formulaire - Left */}
          <div className="relative bg-gradient-to-br from-[#F6FAFD] via-white to-[#EAF4FA] p-5 text-[#0A1931] sm:p-6 lg:p-8">
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-[#B3CFE5] bg-white px-3 py-2 text-xs font-bold text-[#0A1931] shadow-sm">
              <Sparkles size={14} className="text-[#1A3D63]" />
              New
            </div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mx-auto flex min-h-[520px] max-w-sm flex-col justify-center"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-[#B3CFE5]/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B3CFE5] bg-[#F6FAFD] text-[#1A3D63]">
                  <User size={22} />
                </div>
              </motion.div>

              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-[#0A1931]">
                  Nouveau compte
                </h2>
                <p className="mt-1 text-xs text-[#1A3D63]/80">
                  Remplissez vos informations pour commencer
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                    Nom complet
                  </label>

                  <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                    <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                      <User size={16} />
                    </div>

                    <input
                      type="text"
                      placeholder="Entrez votre nom complet"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                    Adresse e-mail
                  </label>

                  <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                    <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                      <Mail size={16} />
                    </div>

                    <input
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                    Mot de passe
                  </label>

                  <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                    <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                      <Lock size={16} />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex h-10 w-10 items-center justify-center text-[#1A3D63] transition hover:text-[#0A3D91]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] text-xs font-bold text-white shadow-xl shadow-[#4A7FA7]/30"
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

                  <UserPlus size={16} />
                  Créer mon compte
                </motion.button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#B3CFE5]" />
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#1A3D63]">
                    ou
                  </span>
                  <div className="h-px flex-1 bg-[#B3CFE5]" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#B3CFE5] bg-white text-xs font-bold text-[#1A3D63] transition hover:bg-[#B3CFE5]/20"
                >
                  <LogIn size={16} />
                  J’ai déjà un compte
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Design / Image - Right */}
          <div className="relative hidden overflow-hidden p-7 lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1931] via-[#123154] to-[#1A3D63]" />

            <motion.div
              animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-16 top-[235px] text-[#4A7FA7]/45"
            >
              <HeartPulse size={125} strokeWidth={1} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-white/5 text-[#B3CFE5] backdrop-blur-xl"
            >
              <Sparkles size={26} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#B3CFE5] to-[#1A3D63]">
                  <HeartPulse size={23} />
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight">
                    Smart<span className="text-[#4A7FA7]">Clinic</span>
                  </h1>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B3CFE5]">
                    Gestion médicale intelligente
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="max-w-sm text-2xl font-extrabold leading-tight">
                  Commencez votre
                  <span className="block text-[#B3CFE5]">
                    expérience médicale.
                  </span>
                </h2>

                <div className="mt-4 h-1 w-14 rounded-full bg-[#B3CFE5]" />

                <p className="mt-5 max-w-sm text-xs leading-6 text-[#F6FAFD]/90">
                  Créez votre compte pour accéder à une plateforme moderne,
                  simple et sécurisée.
                </p>
              </div>

              <div className="mt-7 grid max-w-xs grid-cols-2 gap-3">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 * index }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/45 p-3 backdrop-blur-xl"
                    >
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                        <Icon size={16} />
                      </div>

                      <h3 className="text-xs font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[10px] leading-4 text-[#B3CFE5]">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-2 hidden items-center gap-4 text-[11px] text-[#B3CFE5] lg:flex">
          <span>© 2024 SmartClinic. Tous droits réservés.</span>
          <span>|</span>
          <span>Confidentialité</span>
          <span>|</span>
          <span>Conditions</span>
          <span>|</span>
          <span>Aide</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
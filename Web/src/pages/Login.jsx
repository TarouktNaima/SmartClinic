import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  CalendarDays,
  Users,
  BarChart3,
  ShieldCheck,
  HeartPulse,
  Sun,
} from "lucide-react";

function Login() {
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

  const handleLogin = async () => {
    const loadingToast = toast.loading("Vérification...");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Bienvenue sur SmartClinic ✅", {
        id: loadingToast,
        style: toastStyle,
      });

      setTimeout(() => {
        if (user.role === "patient") {
          navigate("/RdvDashboard");
        } else if (user.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      toast.error("Identifiants incorrects ❌", {
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
      text: "Planifiez et gérez facilement",
    },
    {
      icon: Users,
      title: "Patients",
      text: "Accédez aux dossiers en sécurité",
    },
    {
      icon: BarChart3,
      title: "Statistiques",
      text: "Suivez l'activité du cabinet",
    },
    {
      icon: ShieldCheck,
      title: "Sécurité",
      text: "Vos données sont protégées",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
      <Toaster position="top-center" />

      <div className="relative flex min-h-screen items-center justify-center p-2 lg:p-3">
        <motion.div
          animate={{ x: [0, 70, 0], y: [0, -35, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[360px] w-[360px] rounded-full bg-[#1A3D63]/60 blur-[110px]"
        />

        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-[360px] w-[360px] rounded-full bg-[#4A7FA7]/50 blur-[120px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 grid w-full max-w-[850px] overflow-hidden rounded-[22px] border border-[#B3CFE5]/20 bg-[#0A1931] shadow-2xl lg:grid-cols-[0.95fr_0.9fr]"
        >
          {/* Left Panel */}
          <div className="relative hidden overflow-hidden p-6 lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63]" />

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-20 top-[250px] text-[#4A7FA7]/50"
            >
              <HeartPulse size={115} strokeWidth={1} />
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
                    Votre santé, notre priorité
                  </p>
                </div>
              </div>

              <div className="mt-9">
                <h2 className="max-w-sm text-2xl font-extrabold leading-tight">
                  Bienvenue
                  <span className="block text-[#4A7FA7]">
                    sur SmartClinic.
                  </span>
                </h2>

                <div className="mt-4 h-1 w-12 rounded-full bg-[#4A7FA7]" />

                <p className="mt-5 max-w-sm text-xs leading-6 text-[#F6FAFD]/90">
                  Gérez vos patients, vos rendez-vous et votre cabinet médical
                  en toute simplicité.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 * index }}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className="flex max-w-xs items-center gap-3 rounded-xl border border-[#B3CFE5]/15 bg-[#0A1931]/45 p-2 backdrop-blur-xl"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                        <Icon size={16} />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-[#B3CFE5]">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-5 flex max-w-xs items-center gap-3 rounded-xl border border-[#4A7FA7]/35 bg-[#1A3D63]/50 p-2 backdrop-blur-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A7FA7]">
                  <Lock size={16} />
                </div>

                <div>
                  <h3 className="text-xs font-bold">
                    Conforme aux normes médicales
                  </h3>
                  <p className="text-[10px] text-[#B3CFE5]">
                    Données sécurisées
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative bg-[#F6FAFD] p-5 text-[#0A1931] sm:p-6 lg:p-7">
           

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mx-auto flex min-h-[500px] max-w-sm flex-col justify-center"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-[#B3CFE5]/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B3CFE5] bg-[#F6FAFD] text-[#1A3D63]">
                  <Lock size={22} />
                </div>
              </motion.div>

              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-[#0A1931]">
                  Connexion
                </h2>
                <p className="mt-1 text-xs text-[#1A3D63]/80">
                  Connectez-vous à votre compte
                </p>
              </div>

              <div className="mt-6 space-y-4">
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleLogin();
                      }}
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

                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <label className="flex items-center gap-2 text-[#0A1931]">
                   
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-[#1A3D63] transition hover:text-[#4A7FA7]"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#0A1931] via-[#1A3D63] to-[#4A7FA7] text-xs font-bold text-white shadow-xl shadow-[#1A3D63]/30"
                >
                  <motion.span
                    animate={{ x: ["-120%", "140%"] }}
                    transition={{
                      duration: 2.3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 w-24 bg-white/20 blur-xl"
                  />
                  <LogIn size={16} />
                  Se connecter
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
                  onClick={() => navigate("/register")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#B3CFE5] bg-white text-xs font-bold text-[#1A3D63] transition hover:bg-[#B3CFE5]/20"
                >
                  <UserPlus size={16} />
                  Créer un compte
                </motion.button>
              </div>
            </motion.div>
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

export default Login;
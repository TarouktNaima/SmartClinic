import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  KeyRound,
  Lock,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

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

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/forgot-password", { email });

      setStep(2);

      toast.success("Code envoyé à votre email", {
        style: toastStyle,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Email introuvable", {
        style: {
          ...toastStyle,
          color: "#b91c1c",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/reset-password", {
        email,
        code,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success("Mot de passe modifié avec succès", {
        style: toastStyle,
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur", {
        style: {
          ...toastStyle,
          color: "#b91c1c",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
          className="relative z-10 grid w-full max-w-[880px] overflow-hidden rounded-[24px] border border-[#B3CFE5]/20 bg-[#0A1931] shadow-2xl lg:grid-cols-[0.9fr_1fr]"
        >
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
                    Sécurité médicale
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="max-w-sm text-2xl font-extrabold leading-tight">
                  Récupérez votre
                  <span className="block text-[#B3CFE5]">
                    accès rapidement.
                  </span>
                </h2>

                <div className="mt-4 h-1 w-14 rounded-full bg-[#B3CFE5]" />

                <p className="mt-5 max-w-sm text-xs leading-6 text-[#F6FAFD]/90">
                  Entrez votre adresse e-mail pour recevoir un code de
                  vérification et créer un nouveau mot de passe.
                </p>
              </div>

              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-8 flex max-w-xs items-center gap-3 rounded-2xl border border-[#4A7FA7]/35 bg-[#1A3D63]/50 p-3 backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4A7FA7]">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <h3 className="text-xs font-bold">
                    Vérification sécurisée
                  </h3>
                  <p className="text-[10px] text-[#B3CFE5]">
                    Code envoyé par email
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#F6FAFD] via-white to-[#EAF4FA] p-5 text-[#0A1931] sm:p-6 lg:p-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-[#B3CFE5] bg-white px-3 py-2 text-xs font-bold text-[#1A3D63] shadow-sm transition hover:bg-[#B3CFE5]/20"
            >
              <ArrowLeft size={14} />
              Retour
            </button>

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
                  <KeyRound size={22} />
                </div>
              </motion.div>

              <div className="text-center">
                <h1 className="text-2xl font-extrabold text-[#0A1931]">
                  Mot de passe oublié ?
                </h1>
                <p className="mt-1 text-xs text-[#1A3D63]/80">
                  {step === 1
                    ? "Recevez un code de vérification"
                    : "Entrez le code et votre nouveau mot de passe"}
                </p>
              </div>

              {step === 1 ? (
                <form onSubmit={sendCode} className="mt-6 space-y-4">
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
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#0A1931] via-[#1A3D63] to-[#4A7FA7] text-xs font-bold text-white shadow-xl shadow-[#1A3D63]/30 disabled:cursor-not-allowed disabled:opacity-70"
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

                    <Mail size={16} />
                    {loading ? "Envoi..." : "Générer le code"}
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={resetPassword} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                      Code de vérification
                    </label>

                    <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                      <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                        <KeyRound size={16} />
                      </div>

                      <input
                        type="text"
                        placeholder="Entrez le code reçu"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                      Nouveau mot de passe
                    </label>

                    <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                      <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                        <Lock size={16} />
                      </div>

                      <input
                        type="password"
                        placeholder="Entrez le nouveau mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#0A1931]">
                      Confirmation
                    </label>

                    <div className="flex items-center overflow-hidden rounded-xl border border-[#B3CFE5] bg-white shadow-sm transition focus-within:border-[#4A7FA7] focus-within:ring-2 focus-within:ring-[#B3CFE5]/40">
                      <div className="flex h-10 w-10 items-center justify-center border-r border-[#B3CFE5]/70 text-[#1A3D63]">
                        <Lock size={16} />
                      </div>

                      <input
                        type="password"
                        placeholder="Confirmez le mot de passe"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="h-10 w-full bg-transparent px-3 text-xs text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] text-xs font-bold text-white shadow-xl shadow-[#4A7FA7]/30 disabled:cursor-not-allowed disabled:opacity-70"
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

                    <Lock size={16} />
                    {loading ? "Modification..." : "Modifier le mot de passe"}
                  </motion.button>
                </form>
              )}
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
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound, Lock } from "lucide-react";
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

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/forgot-password", { email });

      
      setStep(2);

      toast.success("Code envoyé à votre email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Email introuvable");
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

      toast.success("Mot de passe modifié avec succès");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-4">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/35 backdrop-blur-xl rounded-[36px] shadow-2xl border border-white/40 p-10"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#6FAED6] mb-8"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#6FAED6]/20 flex items-center justify-center mb-6">
          <KeyRound className="text-[#5FA3CF]" size={32} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Mot de passe oublié ?
        </h1>

        {step === 1 ? (
          <form onSubmit={sendCode} className="space-y-6">
            <p className="text-gray-500">
              Entrez votre email pour générer un code.
            </p>

            <div className="flex items-center gap-3 bg-white/60 border border-white/60 rounded-2xl px-4">
              <Mail className="text-[#6FAED6]" size={20} />
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-4 bg-transparent outline-none text-gray-700"
                required
              />
            </div>

            <button className="w-full bg-[#6FAED6] text-white font-bold py-4 rounded-2xl">
              {loading ? "Envoi..." : "Générer le code"}
            </button>
          </form>
        ) : (
          <form onSubmit={resetPassword} className="space-y-5">
           

            <input
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full py-4 px-5 bg-white/60 rounded-2xl outline-none"
              required
            />

            <div className="flex items-center gap-3 bg-white/60 rounded-2xl px-4">
              <Lock className="text-[#6FAED6]" size={20} />
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-4 bg-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-3 bg-white/60 rounded-2xl px-4">
              <Lock className="text-[#6FAED6]" size={20} />
              <input
                type="password"
                placeholder="Confirmer mot de passe"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full py-4 bg-transparent outline-none"
                required
              />
            </div>

            <button className="w-full bg-[#6FAED6] text-white font-bold py-4 rounded-2xl">
              {loading ? "Modification..." : "Modifier le mot de passe"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
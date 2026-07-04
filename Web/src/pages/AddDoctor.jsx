import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Stethoscope,
  ImagePlus,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function AddDoctor() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez choisir une image");
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !specialite) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", "doctor");
      formData.append("specialite", specialite);

      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("/doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Médecin ajouté avec succès");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setSpecialite("");
      setPhoto(null);
      setPreview(null);

      setTimeout(() => {
        navigate("/doctors");
      }, 1000);
    } catch (err) {
      console.log(err.response?.data || err);
      toast.error(err.response?.data?.message || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex">
      <Sidebar />

      <main className="flex-1 p-5 lg:p-8">
        <Header user={user} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
          >
            <ArrowLeft size={20} />
            Retour aux médecins
          </button>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 mb-6">
                  <UserPlus size={28} />
                </div>

                <h1 className="text-4xl font-bold text-white mb-3">
                  Ajouter un médecin
                </h1>

                <p className="text-slate-400 leading-7">
                  Ce médecin sera ajouté dans la table users avec le role doctor,
                  et aussi dans la table doctors avec ses informations médicales.
                </p>

                <div className="mt-10 flex justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-indigo-500/30 blur-3xl rounded-full" />

                    {preview ? (
                      <img
                        src={preview}
                        alt="Doctor preview"
                        className="relative w-64 h-64 object-cover rounded-[40px] border border-white/20 shadow-2xl"
                      />
                    ) : (
                      <div className="relative w-64 h-64 rounded-[40px] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 flex items-center justify-center shadow-2xl">
                        <Stethoscope size={100} className="text-indigo-300" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
            >
              <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest">
                Nouveau médecin
              </p>

              <h2 className="text-3xl font-bold text-white mt-2 mb-8">
                Informations du compte
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <InputBox
                  label="Nom du médecin"
                  icon={UserRound}
                  type="text"
                  placeholder="Ex: Ahmed Benali"
                  value={name}
                  setValue={setName}
                  required
                />

                <InputBox
                  label="Email"
                  icon={Mail}
                  type="email"
                  placeholder="doctor@smartclinic.com"
                  value={email}
                  setValue={setEmail}
                  required
                />

                <InputBox
                  label="Téléphone"
                  icon={Phone}
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={phone}
                  setValue={setPhone}
                />

                <InputBox
                  label="Mot de passe"
                  icon={Lock}
                  type="password"
                  placeholder="Mot de passe du médecin"
                  value={password}
                  setValue={setPassword}
                  required
                />

                <div>
                  <label className="text-slate-300 text-sm font-medium">
                    Spécialité
                  </label>

                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-indigo-500/60 transition">
                    <Stethoscope size={20} className="text-indigo-300" />

                    <select
                      value={specialite}
                      onChange={(e) => setSpecialite(e.target.value)}
                      className="w-full py-4 bg-transparent outline-none text-white"
                      required
                    >
                      <option value="" className="bg-slate-900">
                        Choisir une spécialité
                      </option>
                      <option value="Dentiste" className="bg-slate-900">
                        Dentiste
                      </option>
                      <option value="Cardiologue" className="bg-slate-900">
                        Cardiologue
                      </option>
                      <option value="Généraliste" className="bg-slate-900">
                        Généraliste
                      </option>
                      <option value="Neurologue" className="bg-slate-900">
                        Neurologue
                      </option>
                      <option value="Orthopédiste" className="bg-slate-900">
                        Orthopédiste
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium">
                    Photo du médecin
                  </label>

                  <label className="mt-2 cursor-pointer flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition p-7">
                    <ImagePlus size={35} className="text-indigo-300 mb-3" />

                    <p className="text-white font-semibold">
                      Sélectionner une photo
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      JPG, JPEG ou PNG
                    </p>

                    {photo && (
                      <p className="text-emerald-300 text-sm mt-3">
                        {photo.name}
                      </p>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 hover:from-indigo-500 hover:via-violet-500 hover:to-blue-500 text-white py-4 font-bold shadow-xl disabled:opacity-50"
                >
                  <UserPlus size={21} />
                  {loading ? "Ajout en cours..." : "Ajouter le médecin"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function InputBox({ label, icon: Icon, type, placeholder, value, setValue, required }) {
  return (
    <div>
      <label className="text-slate-300 text-sm font-medium">{label}</label>

      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-indigo-500/60 transition">
        <Icon size={20} className="text-indigo-300" />

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full py-4 bg-transparent outline-none text-white placeholder:text-slate-500"
          required={required}
        />
      </div>
    </div>
  );
}

export default AddDoctor;
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
  HeartPulse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

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
            className="mx-auto max-w-6xl"
          >
            

            <div className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Gestion des médecins
              </p>

              <h1 className="text-2xl font-extrabold text-white lg:text-3xl">
                Ajouter un nouveau médecin
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
                Créez un compte médecin avec ses informations personnelles,
                sa spécialité et sa photo professionnelle.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 xl:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-7 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#4A7FA7]/20 blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#B3CFE5]/10 blur-[100px]" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 text-[#B3CFE5]">
                    <UserPlus size={27} />
                  </div>

                  <h2 className="mb-3 text-2xl font-extrabold text-white">
                    Profil du médecin
                  </h2>

                  <p className="text-sm leading-6 text-[#B3CFE5]">
                    Cette section permet de prévisualiser la photo du médecin
                    avant l’enregistrement.
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
                      <div className="absolute inset-0 rounded-full bg-[#4A7FA7]/30 blur-3xl" />

                      {preview ? (
                        <img
                          src={preview}
                          alt="Aperçu du médecin"
                          className="relative h-64 w-64 rounded-[36px] border border-[#B3CFE5]/25 object-cover shadow-2xl"
                        />
                      ) : (
                        <div className="relative flex h-64 w-64 items-center justify-center rounded-[36px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#102A4B] to-[#1A3D63] shadow-2xl">
                          <Stethoscope size={95} className="text-[#B3CFE5]" />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-[#B3CFE5]/15 bg-[#0A1931]/50 p-4">
                    <div className="flex items-center gap-3">
                      <HeartPulse size={18} className="text-[#B3CFE5]" />
                      <p className="text-sm font-bold text-white">
                        Compte médecin sécurisé
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#B3CFE5]/80">
                      Les données seront enregistrées dans le système
                      SmartClinic.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-7 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                  Nouveau médecin
                </p>

                <h2 className="mt-2 mb-7 text-2xl font-extrabold text-white">
                  Informations du compte
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputBox
                    label="Nom du médecin"
                    icon={UserRound}
                    type="text"
                    placeholder="Ex : Ahmed Benali"
                    value={name}
                    setValue={setName}
                    required
                  />

                  <InputBox
                    label="Adresse e-mail"
                    icon={Mail}
                    type="email"
                    placeholder="medecin@smartclinic.com"
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
                    <label className="text-sm font-bold text-[#B3CFE5]">
                      Spécialité
                    </label>

                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70 focus-within:ring-2 focus-within:ring-[#B3CFE5]/20">
                      <Stethoscope size={18} className="text-[#B3CFE5]" />

                      <select
                        value={specialite}
                        onChange={(e) => setSpecialite(e.target.value)}
                        className="w-full bg-transparent py-3.5 text-sm text-white outline-none"
                        required
                      >
                        <option value="" className="bg-[#0A1931]">
                          Choisir une spécialité
                        </option>
                        <option value="Dentiste" className="bg-[#0A1931]">
                          Dentiste
                        </option>
                        <option value="Cardiologue" className="bg-[#0A1931]">
                          Cardiologue
                        </option>
                        <option value="Généraliste" className="bg-[#0A1931]">
                          Généraliste
                        </option>
                        <option value="Neurologue" className="bg-[#0A1931]">
                          Neurologue
                        </option>
                        <option value="Orthopédiste" className="bg-[#0A1931]">
                          Orthopédiste
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#B3CFE5]">
                      Photo du médecin
                    </label>

                    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B3CFE5]/20 bg-[#0A1931]/45 p-6 transition hover:border-[#4A7FA7]/60 hover:bg-[#1A3D63]/40">
                      <ImagePlus size={32} className="mb-3 text-[#B3CFE5]" />

                      <p className="font-bold text-white">
                        Sélectionner une photo
                      </p>

                      <p className="mt-1 text-xs text-[#B3CFE5]/70">
                        JPG, JPEG ou PNG
                      </p>

                      {photo && (
                        <p className="mt-3 text-xs font-bold text-[#B3CFE5]">
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
                    className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3.5 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25 disabled:cursor-not-allowed disabled:opacity-60"
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
                    {loading ? "Ajout en cours..." : "Ajouter le médecin"}
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

function InputBox({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  setValue,
  required,
}) {
  return (
    <div>
      <label className="text-sm font-bold text-[#B3CFE5]">{label}</label>

      <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70 focus-within:ring-2 focus-within:ring-[#B3CFE5]/20">
        <Icon size={18} className="text-[#B3CFE5]" />

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#B3CFE5]/45"
          required={required}
        />
      </div>
    </div>
  );
}

export default AddDoctor;
import React from "react";
import { UserRound, Mail, Phone, Calendar, Save, X } from "lucide-react";

function PatientForm({ formData, setFormData, onSubmit, isEditing }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      prenom: "",
      age: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
        {isEditing ? "Modification" : "Nouveau patient"}
      </p>

      <h2 className="mb-6 mt-2 text-2xl font-extrabold text-white">
        {isEditing ? "Modifier le patient" : "Ajouter un patient"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        <InputBox
          label="Nom"
          icon={UserRound}
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Nom du patient"
        />

        <InputBox
          label="Prénom"
          icon={UserRound}
          type="text"
          name="prenom"
          value={formData.prenom || ""}
          onChange={handleChange}
          placeholder="Prénom du patient"
        />

        <InputBox
          label="Âge"
          icon={Calendar}
          type="number"
          name="age"
          value={formData.age || ""}
          onChange={handleChange}
          placeholder="Âge du patient"
        />

        <InputBox
          label="Email"
          icon={Mail}
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Email du patient"
        />

        <InputBox
          label="Téléphone"
          icon={Phone}
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Téléphone du patient"
        />

        <button
          type="submit"
          className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3.5 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25 transition hover:scale-[1.01]"
        >
          <Save size={18} />
          {isEditing ? "Enregistrer les modifications" : "Enregistrer le patient"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 py-3 text-sm font-bold text-[#B3CFE5] transition hover:bg-[#1A3D63]"
          >
            <X size={17} />
            Annuler
          </button>
        )}
      </form>
    </div>
  );
}

function InputBox({ label, icon: Icon, type, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#B3CFE5]">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 transition focus-within:border-[#4A7FA7]/70 focus-within:ring-2 focus-within:ring-[#B3CFE5]/20">
        <Icon size={18} className="text-[#B3CFE5]" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#B3CFE5]/45"
        />
      </div>
    </div>
  );
}

export default PatientForm;
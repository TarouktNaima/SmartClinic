import { useState } from "react";
import api from "../api/axios";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("specialite", specialite);
      formData.append("photo", photo);

      await api.post("/doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Doctor ajouté avec succès ✅");

      // reset
      setName("");
      setSpecialite("");
      setPhoto(null);

    } catch (err) {
      console.log(err);
      setMessage("Erreur ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC]">

      <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add Doctor 👨‍⚕️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          {/* SPECIALITE */}
          <select
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            className="w-full p-3 rounded-xl border focus:outline-none"
            required
          >
            <option value="">Choisir spécialité</option>
            <option>Dentiste</option>
            <option>Cardiologue</option>
            <option>Généraliste</option>
            <option>Neurologue</option>
            <option>Orthopédiste</option>
          </select>

          {/* PHOTO */}
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl shadow"
          >
            Ajouter
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-gray-700">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default AddDoctor;
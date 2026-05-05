import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion"; // Bach t-khdem 'motion'
import { Stethoscope, Heart, Brain, Activity } from "lucide-react"; // Bach t-khdem l-icons

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState("");

  const specialites = [
    "Dentiste",
    "Cardiologue",
    "Généraliste",
    "Neurologue",
    "Orthopédiste",
  ];

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  // filtre
  const filteredDoctors = selectedSpecialite
    ? doctors.filter((doc) => doc.specialite === selectedSpecialite)
    : doctors;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nos Spécialités</h2>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {specialites.map((sp, index) => (
          <button
            key={index}
            onClick={() => setSelectedSpecialite(sp)}
          >
            {sp}
          </button>
        ))}
      </div>

      <h2>Doctors</h2>

      {filteredDoctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        filteredDoctors.map((doc) => (
          <div key={doc.id}>
            <h3>{doc.name}</h3>
            <p>{doc.specialite}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorsList;
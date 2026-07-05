import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import PatientForm from "./PatientForm";
import PatientsList from "./PatientsList";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    age: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);

    setFormData({
      name: patient.name,
      prenom: patient.prenom,
      age: patient.age,
      email: patient.email || "",
      phone: patient.phone,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/patients/${currentPatientId}`, formData);
      } else {
        await api.post("/patients", formData);
      }

      setFormData({
        name: "",
        prenom: "",
        age: "",
        email: "",
        phone: "",
      });

      setIsEditing(false);
      setCurrentPatientId(null);
      fetchPatients();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce patient ?")) return;

    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Erreur :", error);
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
          >
            <div className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                Gestion des patients
              </p>

              <h1 className="flex items-center gap-3 text-2xl font-extrabold text-white lg:text-3xl">
                <UsersRound className="text-[#B3CFE5]" size={28} />
                Liste des patients
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
                Ajoutez, modifiez et consultez les dossiers des patients de la
                clinique.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, x: -22 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
              >
                <PatientForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  isEditing={isEditing}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl lg:col-span-2"
              >
                <PatientsList
                  patients={patients}
                  loading={loading}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                  onSelectPatient={(patient) =>
                    navigate(`/consultations?patientId=${patient.id}`)
                  }
                />
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default PatientsPage;
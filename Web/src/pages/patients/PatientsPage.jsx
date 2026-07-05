import React, { useState, useEffect } from "react";
import PatientForm from "./PatientForm";
import PatientsList from "./PatientsList";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

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

  // Charger les patients
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

  // Modifier
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

  // Ajouter / Modifier
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

  // Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr ?")) return;

    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <PatientForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <div className="lg:col-span-2">
        <PatientsList
          patients={patients}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onSelectPatient={(patient) =>
            navigate(`/consultations?patientId=${patient.id}`)
          }
        />
      </div>

    </div>
  );
}

export default PatientsPage;
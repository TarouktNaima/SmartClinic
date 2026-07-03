import React, { useState, useEffect } from 'react';
import PatientForm from '../components/PatientForm';
import PatientsList from '../components/PatientsList';
import { useNavigate } from 'react-router-dom';

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: '', prenom: '', age: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  
  const navigate = useNavigate();
  const API_URL = 'http://localhost/SmartClinic/Api/public/api/patients';

  const fetchPatients = async () => {
    try {
      const response = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
      const data = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleEditClick = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);
    setFormData({ name: patient.name, prenom: patient.prenom, age: patient.age, email: patient.email || '', phone: patient.phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `${API_URL}/${currentPatientId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ name: '', prenom: '', email: '', age: '', phone: '' });
        setIsEditing(false);
        setCurrentPatientId(null);
        fetchPatients();
      }
    } catch (error) { console.error("Error saving patient:", error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
        if (response.ok) { fetchPatients(); }
      } catch (error) { console.error("Error deleting patient:", error); }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <PatientForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
      <div className="lg:col-span-2">
        <PatientsList 
          patients={patients} 
          loading={loading} 
          onEdit={handleEditClick} 
          onDelete={handleDelete} 
          onSelectPatient={(patient) => {
            
            navigate(`/consultations?patientId=${patient.id}`);
          }}
        />
      </div>
    </div>
  );
}

export default PatientsPage;
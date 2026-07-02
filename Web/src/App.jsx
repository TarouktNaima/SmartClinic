import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientsList from './components/PatientsList';

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: '', prenom: '', age: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);

  const API_URL = 'http://localhost/SmartClinic/Api/public/api/patients';

  // 1. GET Patients
  const fetchPatients = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // 2. Préparer la modification
  const handleEditClick = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);
    setFormData({
      name: patient.name,
      prenom: patient.prenom,
      age: patient.age,
      email: patient.email,
      phone: patient.phone
    });
  };

  // 3. POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isEditing ? `${API_URL}/${currentPatientId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', prenom: '', email: '', age: '', phone: '' });
        setIsEditing(false);
        setCurrentPatientId(null);
        fetchPatients();
      } else {
        const errorData = await response.json();
        console.log("Validation Errors:", errorData);
      }
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  // 4. DELETE Patient
  const handleDelete = async (id) => {
    // التنبيه بالفرنسية
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          fetchPatients();
        } else {
          console.error("Failed to delete patient");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-bold text-slate-800">SmartClinic Dashboard</h1>
          <p className="text-slate-500">Gestion des patients et des consultations médicales</p>
        </header>

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
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
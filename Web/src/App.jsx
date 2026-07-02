import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientsList from './components/PatientsList';
import ConsultationForm from './components/ConsultationForm';
import PatientHistory from './components/PatientHistory';
import UploadFile from './components/UploadFile';

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: '', prenom: '', age: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // التبويب الافتراضي 'patients' ويمكن الاختيار بين 'patients' أو 'consultations' أو 'documents'
  const [activeTab, setActiveTab] = useState('patients'); 

  const API_URL = 'http://localhost/SmartClinic/Api/public/api/patients';
  const CONSULTATION_API_URL = 'http://localhost/SmartClinic/Api/public/api/consultations';

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

  // 2. GET Historique d'un patient spécifique
  const fetchPatientHistory = async (patient) => {
    setSelectedPatient(patient);
    setLoadingHistory(true);
    try {
      const response = await fetch(`${API_URL}/${patient.id}/consultations`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      } else {
        console.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // 3. Préparer la modification d'un patient
  const handleEditClick = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);
    setFormData({
      name: patient.name,
      prenom: patient.prenom,
      age: patient.age,
      email: patient.email || '',
      phone: patient.phone
    });
  };

  // 4. POST / PUT Patient
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

  // 5. DELETE Patient
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          fetchPatients();
          if (selectedPatient && selectedPatient.id === id) {
            setSelectedPatient(null);
            setHistory([]);
          }
        } else {
          console.error("Failed to delete patient");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  // 6. POST Nouvelle Consultation
  const handleConsultationSubmit = async (consultationData, resetFormCallback) => {
    try {
      const response = await fetch(CONSULTATION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(consultationData)
      });

      if (response.ok) {
        alert("Consultation enregistrée avec succès !");
        resetFormCallback();
        
        if (selectedPatient && selectedPatient.id === parseInt(consultationData.patient_id)) {
          fetchPatientHistory(selectedPatient);
        }
      } else {
        const errorData = await response.json();
        console.error("Validation Errors Consultation:", errorData);
      }
    } catch (error) {
      console.error("Error saving consultation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-left" dir="ltr">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">SmartClinic Dashboard</h1>
            <p className="text-slate-500">Gestion des patients, des consultations et des documents médicaux</p>
          </div>
          
          {/* شريط التنقل مدموج فيه التبويب الثالث بنجاح */}
          <div className="flex bg-slate-200/70 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('patients')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'patients' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Patients
            </button>
            <button 
              onClick={() => setActiveTab('consultations')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'consultations' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Consultations & Historique
            </button>
            <button 
              onClick={() => setActiveTab('documents')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'documents' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Documents & Files
            </button>
          </div>
        </header>

        {/* --- القسم الأول: إدارة المرضى --- */}
        {activeTab === 'patients' && (
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
                onSelectPatient={(patient) => {
                  fetchPatientHistory(patient);
                  setActiveTab('consultations'); 
                }}
              />
            </div>
          </div>
        )}

        {/* --- القسم الثاني: الفحوصات والتاريخ الطبي --- */}
        {activeTab === 'consultations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ConsultationForm 
              patients={patients} 
              onSubmit={handleConsultationSubmit} 
            />
            
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-500 mb-2">Sélection rapide pour l'historique :</h3>
                <div className="flex flex-wrap gap-2">
                  {patients.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => fetchPatientHistory(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${selectedPatient?.id === p.id ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {p.name} {p.prenom}
                    </button>
                  ))}
                  {patients.length === 0 && <p className="text-xs text-slate-400">Aucun patient disponible.</p>}
                </div>
              </div>

              <PatientHistory 
                selectedPatient={selectedPatient} 
                history={history} 
                loadingHistory={loadingHistory} 
              />
            </div>
          </div>
        )}

        {/* --- القسم الثالث الجديد: إدارة مستندات وملفات المرضى --- */}
        {activeTab === 'documents' && (
          <UploadFile patients={patients} />
        )}

      </div>
    </div>
  );
}

export default App;
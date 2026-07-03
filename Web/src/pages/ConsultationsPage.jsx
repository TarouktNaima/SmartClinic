import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConsultationForm from '../components/ConsultationForm';
import PatientHistory from '../components/PatientHistory';

function ConsultationsPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('patientId');

  const API_URL = 'http://localhost/SmartClinic/Api/public/api/patients';
  const CONSULTATION_API_URL = 'http://localhost/SmartClinic/Api/public/api/consultations';

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
        const data = await response.json();
        setPatients(data);
        
        // إيلا كاين مريض ممرر في الرابط، كنجيبو السجل ديالو تِلقائياً
        if (targetPatientId && data.length > 0) {
          const patient = data.find(p => p.id === parseInt(targetPatientId));
          if (patient) fetchPatientHistory(patient);
        }
      } catch (error) { console.error(error); }
    };
    fetchPatients();
  }, [targetPatientId]);

  const fetchPatientHistory = async (patient) => {
    setSelectedPatient(patient);
    setLoadingHistory(true);
    try {
      const response = await fetch(`${API_URL}/${patient.id}/consultations`, { headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) { console.error(error); } 
    finally { setLoadingHistory(false); }
  };

  const handleConsultationSubmit = async (consultationData, resetFormCallback) => {
    try {
      const response = await fetch(CONSULTATION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(consultationData)
      });
      if (response.ok) {
        alert("Consultation enregistrée avec succès !");
        resetFormCallback();
        if (selectedPatient && selectedPatient.id === parseInt(consultationData.patient_id)) {
          fetchPatientHistory(selectedPatient);
        }
      }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ConsultationForm patients={patients} onSubmit={handleConsultationSubmit} />
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Sélection rapide pour l'historique :</h3>
          <div className="flex flex-wrap gap-2">
            {patients.map(p => (
              <button key={p.id} onClick={() => fetchPatientHistory(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${selectedPatient?.id === p.id ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                {p.name} {p.prenom}
              </button>
            ))}
          </div>
        </div>
        <PatientHistory selectedPatient={selectedPatient} history={history} loadingHistory={loadingHistory} />
      </div>
    </div>
  );
}

export default ConsultationsPage;
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ConsultationForm from "./ConsultationForm";
import PatientHistory from "./PatientHistory";
import api from "../../api/axios";

function ConsultationsPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get("patientId");

  // Charger les patients
  useEffect(() => {
    fetchPatients();
  }, []);

  // Aller directement vers un patient si passé dans l'URL
  useEffect(() => {
    if (targetPatientId && patients.length > 0) {
      const patient = patients.find(
        (p) => p.id === parseInt(targetPatientId)
      );

      if (patient) {
        fetchPatientHistory(patient);
      }
    }
  }, [patients, targetPatientId]);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatientHistory = async (patient) => {
    setSelectedPatient(patient);
    setLoadingHistory(true);

    try {
      const response = await api.get(
        `/patients/${patient.id}/consultations`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleConsultationSubmit = async (
    consultationData,
    resetFormCallback
  ) => {
    try {
      await api.post("/consultations", consultationData);

      alert("Consultation enregistrée avec succès !");

      resetFormCallback();

      if (
        selectedPatient &&
        selectedPatient.id === Number(consultationData.patient_id)
      ) {
        fetchPatientHistory(selectedPatient);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <ConsultationForm
        patients={patients}
        onSubmit={handleConsultationSubmit}
      />

      <div className="lg:col-span-2 space-y-6">

        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100">

          <h3 className="text-sm font-semibold text-slate-500 mb-2">
            Sélection rapide pour l'historique :
          </h3>

          <div className="flex flex-wrap gap-2">

            {patients.map((patient) => (

              <button
                key={patient.id}
                onClick={() => fetchPatientHistory(patient)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  selectedPatient?.id === patient.id
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {patient.name} {patient.prenom}
              </button>

            ))}

          </div>

        </div>

        <PatientHistory
          selectedPatient={selectedPatient}
          history={history}
          loadingHistory={loadingHistory}
        />

      </div>

    </div>
  );
}

export default ConsultationsPage;
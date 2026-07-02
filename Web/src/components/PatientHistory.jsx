import React from 'react';

function PatientHistory({ selectedPatient, history, loadingHistory }) {
  if (!selectedPatient) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 text-center text-slate-400 py-8">
        Sélectionnez un patient dans la liste pour voir son historique médical.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-slate-700">
          Historique Médical : <span className="text-blue-600">{selectedPatient.name} {selectedPatient.prenom}</span>
        </h2>
      </div>

      {loadingHistory ? (
        <p className="text-slate-500 text-center py-4">Chargement de l'historique...</p>
      ) : history.length === 0 ? (
        <p className="text-slate-400 text-center py-4">Aucune consultation enregistrée pour ce patient.</p>
      ) : (
        <div className="space-y-4">
          {history.map((consultation) => (
            <div key={consultation.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-200/60 pb-1">
                <span>Consultation N° {consultation.id}</span>
                <span>{new Date(consultation.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700">Diagnostic :</h4>
                <p className="text-sm text-slate-600 bg-white p-2 rounded-lg mt-1 border border-slate-100">{consultation.diagnostic}</p>
              </div>
              {consultation.prescription && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Prescription / Ordonnance :</h4>
                  <p className="text-sm text-emerald-700 bg-emerald-50/50 p-2 rounded-lg mt-1 border border-emerald-100 font-mono">{consultation.prescription}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientHistory;
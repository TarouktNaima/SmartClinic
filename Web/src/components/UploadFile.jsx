import React, { useState, useEffect } from 'react';

function UploadFile({ patients }) {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [patientFiles, setPatientFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);

  const UPLOAD_API_URL = 'http://localhost/SmartClinic/Api/public/api/upload';
  const GET_FILES_URL = 'http://localhost/SmartClinic/Api/public/api/patients';

  // get the files of the patient
  const fetchPatientFiles = async (patientId) => {
    if (!patientId) return;
    setLoadingFiles(true);
    try {
      const response = await fetch(`${GET_FILES_URL}/${patientId}/files`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientFiles(data);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (selectedPatientId) {
      fetchPatientFiles(selectedPatientId);
    } else {
      setPatientFiles([]);
    }
  }, [selectedPatientId]);

  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !title || !file) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('patient_id', selectedPatientId);
    formData.append('title', title);
    formData.append('file', file);

    try {
      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json' }, 
        body: formData
      });

      if (response.ok) {
        alert("Fichier téléchargé avec succès !");
        setTitle('');
        setFile(null);
        e.target.reset();

        fetchPatientFiles(selectedPatientId);
      } else {
        const errorData = await response.json();
        console.error("Upload Error:", errorData);
        alert("Erreur lors de l'upload du fichier.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
      
      {/*  Upload Form  */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 h-fit">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Ajouter un document</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Sélectionner un Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-400"
              required
            >
              <option value="">-- Choisir un patient --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} {p.prenom}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Titre du document</label>
            <input
              type="text"
              placeholder="Ex: Analyse de sang, Radio X..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Fichier (PDF, Image, Doc max 2Mo)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer ${uploading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {uploading ? 'Téléchargement...' : 'Uploader le document'}
          </button>
        </form>
      </div>


      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Documents du Patient</h2>
        
        {!selectedPatientId ? (
          <p className="text-slate-400 text-center py-8">Veuillez sélectionner un patient pour voir ses documents.</p>
        ) : loadingFiles ? (
          <p className="text-slate-500 text-center py-8">Chargement des documents...</p>
        ) : patientFiles.length === 0 ? (
          <p className="text-slate-400 text-center py-8">Aucun document trouvé pour ce patient.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-3 text-slate-600 font-semibold text-sm">Titre du document</th>
                  <th className="p-3 text-slate-600 font-semibold text-sm">Date d'ajout</th>
                  <th className="p-3 text-slate-600 font-semibold text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {patientFiles.map((file) => (
                  <tr key={file.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-medium text-slate-700">{file.title}</td>
                    <td className="p-3 text-slate-500 text-sm">{new Date(file.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="p-3 text-center">
                      <a 
                        href={`http://localhost/SmartClinic/Api/public${file.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                      >
                        Voir / Télécharger
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default UploadFile;
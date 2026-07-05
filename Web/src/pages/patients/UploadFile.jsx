import React, { useState, useEffect } from "react";
import api from "../../api/axios";

function UploadFile({ patients = [] }) {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [patientFiles, setPatientFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ==========================
  // Charger les fichiers
  // ==========================
  const fetchPatientFiles = async (patientId) => {
    if (!patientId) return;

    setLoadingFiles(true);

    try {
      const response = await api.get(`/patients/${patientId}/files`);
      setPatientFiles(response.data);
    } catch (error) {
      console.error("Erreur :", error);
      setPatientFiles([]);
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

  // ==========================
  // Choisir fichier
  // ==========================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ==========================
  // Upload
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatientId || !title || !file) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("patient_id", selectedPatientId);
    formData.append("title", title);
    formData.append("file", file);

    try {
      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Fichier téléchargé avec succès ✅");

      setTitle("");
      setFile(null);
      e.target.reset();

      fetchPatientFiles(selectedPatientId);
    } catch (error) {
      console.error("Erreur :", error.response?.data || error);
      alert("Erreur lors de l'upload !");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">

        <h2 className="text-xl font-semibold mb-4">
          Ajouter un document
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Choisir un patient</option>

            {Array.isArray(patients) &&
              patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.prenom}
                </option>
              ))}
          </select>

          <input
            type="text"
            placeholder="Titre du document"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            required
          />

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {uploading ? "Téléchargement..." : "Uploader"}
          </button>

        </form>

      </div>

      {/* Liste des fichiers */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow border border-slate-100">

        <h2 className="text-xl font-semibold mb-4">
          Documents
        </h2>

        {!selectedPatientId ? (
          <p>Sélectionnez un patient.</p>
        ) : loadingFiles ? (
          <p>Chargement...</p>
        ) : patientFiles.length === 0 ? (
          <p>Aucun document.</p>
        ) : (
          <table className="w-full">

            <thead>
              <tr>
                <th className="text-left p-3">Titre</th>
                <th className="text-left p-3">Date</th>
                <th className="text-center p-3">Action</th>
              </tr>
            </thead>

            <tbody>
                {patientFiles.map((doc) => (
                    <tr key={doc.id} className="border-b">
                        <td className="p-3">
                             {doc.title}
                              </td>
                              <td className="p-3">
                                 {new Date(doc.created_at).toLocaleDateString()}
                                 </td>
                                 <td className="p-3 text-center">
                                    <a
                                    href={`http://127.0.0.1:8000/storage/${doc.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                                    >
                                        Voir
                                        </a>
                                        </td>
                                        </tr>
                                     ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default UploadFile;
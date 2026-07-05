import React, { useState, useEffect } from "react";
import UploadFile from "./UploadFile";
import api from "../../api/axios";

function DocumentsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des patients :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        Chargement...
      </div>
    );
  }

  return <UploadFile patients={patients} />;
}

export default DocumentsPage;
import React, { useState, useEffect } from 'react';
import UploadFile from '../components/UploadFile';

function DocumentsPage() {
  const [patients, setPatients] = useState([]);
  const API_URL = 'http://localhost/SmartClinic/Api/public/api/patients';

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
        const data = await response.json();
        setPatients(data);
      } catch (error) { console.error(error); }
    };
    fetchPatients();
  }, []);

  return <UploadFile patients={patients} />;
}

export default DocumentsPage;
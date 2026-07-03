import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientsPage from './pages/PatientsPage';
import ConsultationsPage from './pages/ConsultationsPage';
import DocumentsPage from './pages/DocumentsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 p-6 font-sans text-left" dir="ltr">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <Navbar /> 
          
          <Routes>
            <Route path="/" element={<PatientsPage />} />
            <Route path="/consultations" element={<ConsultationsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
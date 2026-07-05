import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import RdvDashboard from "./components/dashboard/RdvDashboard.jsx";

import SpecialitiesPage from "./pages/Rendez-vous/SpecialitiesPage.jsx";
import DoctorsBySpecialite from "./pages/Doctors/DoctorsBySpecialite.jsx";
import AddDoctor from "./pages/Doctors/AddDoctor.jsx";
import DoctorsManagement from "./pages/Doctors/DoctorsManagement.jsx";
import AddSpecialite from "./pages/Rendez-vous/AddSpecialite.jsx";

import CreateRdv from "./pages/Rendez-vous/CreateRdv.jsx";
import MesRdv from "./pages/Rendez-vous/MesRdv.jsx";
import RdvList from "./pages/Rendez-vous/RdvList.jsx";
import DispoSlots from "./pages/Rendez-vous/DispoSlots.jsx";
import Historique from "./pages/Rendez-vous/Historique.jsx";

import PatientsPage from "./pages/patients/PatientsPage.jsx";
import ConsultationsPage from "./pages/patients/ConsultationsPage.jsx";
import DocumentsPage from "./pages/patients/DocumentsPage.jsx";

import AddAdmin from "./pages/user/AddAdmin.jsx";
import AddSecretary from "./pages/user/AddSecretary.jsx";
import DoctorDashboard from "./components/dashboard/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/Doctors/DoctorAppointments.jsx";
import DoctorPatients from "./pages/Doctors/DoctorPatients.jsx";
import DoctorConsultations from "./pages/Doctors/DoctorConsultations.jsx";
import DoctorProfile from "./pages/Doctors/DoctorProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
  
import AdminsManagement from "./pages/AdminsManagement";
import SecretariesManagement from "./pages/SecretariesManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= ADMIN / SECRETARY ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= PATIENT ================= */}

        <Route
          path="/dashboard-patient"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <RdvDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= SPECIALITIES ================= */}

        <Route
          path="/specialities"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary", "patient"]}>
              <SpecialitiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-specialite"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddSpecialite />
            </ProtectedRoute>
          }
        />

        <Route path="/doctors/:specialite" element={<DoctorsBySpecialite />} />

        {/* ================= DOCTORS ================= */}

        <Route
          path="/add-doctor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DoctorsManagement />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN USERS ================= */}

        <Route
          path="/add-admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-secretary"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddSecretary />
            </ProtectedRoute>
          }
        />
        <Route path="/admins" element={<AdminsManagement />} />
        <Route path="/secretaries" element={<SecretariesManagement />} />

        {/* ================= DOCTOR ================= */}

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/consultations"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorConsultations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        {/* ================= RENDEZ-VOUS ================= */}

        <Route
          path="/reserver-rdv"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "secretary", "doctor", "patient"]}
            >
              <CreateRdv />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mes-rendezvous"
          element={
            <ProtectedRoute allowedRoles={["patient", "admin"]}>
              <MesRdv />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestion-rdv"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary"]}>
              <RdvList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/disponibilites"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary", "patient"]}>
              <DispoSlots />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RdvDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary", "patient"]}>
              <RdvDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/historique"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "secretary", "doctor", "patient"]}
            >
              <Historique />
            </ProtectedRoute>
          }
        />

        {/* ================= PATIENTS ================= */}

        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <PatientsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consultations"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <ConsultationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

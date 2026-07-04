import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import SpecialitiesPage from "./pages/SpecialitiesPage.jsx";
import DoctorsBySpecialite from "./pages/DoctorsBySpecialite.jsx";
import AddDoctor from "./pages/AddDoctor.jsx";
import DoctorsManagement from "./pages/DoctorsManagement.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddAdmin from "./pages/AddAdmin";
import AddSecretary from "./pages/AddSecretary";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorConsultations from "./pages/DoctorConsultations";
import DoctorProfile from "./pages/DoctorProfile";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/specialities"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary", "patient"]}>
              <SpecialitiesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/doctors/:specialite" element={<DoctorsBySpecialite />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "secretary"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
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
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

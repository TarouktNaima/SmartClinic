import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import SpecialitiesPage from "./pages/SpecialitiesPage.jsx";
import DoctorsBySpecialite from "./pages/DoctorsBySpecialite.jsx";
import AddDoctor from "./pages/AddDoctor.jsx";
import DoctorsManagement from "./pages/DoctorsManagement.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

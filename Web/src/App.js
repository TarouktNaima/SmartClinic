import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import SpecialitiesPage from "./pages/SpecialitiesPage.jsx";
import DoctorsBySpecialite from "./pages/DoctorsBySpecialite.jsx";
import AddDoctor from "./pages/AddDoctor.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/specialities" element={<SpecialitiesPage />} />
        <Route path="/doctors/:specialite" element={<DoctorsBySpecialite />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
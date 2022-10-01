import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./layout/Auth";
import Admin from "./layout/Admin";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Confirm from "./pages/Confirm";
import NuevoPassword from "./pages/NuevoPassword";
import Pacientes from "./pages/Pacientes";
import Perfil from "./pages/Perfil";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import CambiaPassword from "./pages/CambiaPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgotPassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:token" element={<Confirm />} />
            </Route>

            <Route path="/admin" element={<Admin />}>
              <Route index element={<Pacientes />} />
              <Route path="perfil" element={<Perfil />}/>
              <Route path="cambiar-password" element={<CambiaPassword />}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

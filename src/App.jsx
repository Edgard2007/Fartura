import { Routes, Route } from "react-router-dom";
import landing from "./pages/landing";
import Home from "./pages/Home";
import Dados from "./pages/Dados";
import Personas from "./pages/Personas";
import Mural from "./pages/Mural";
import Simulador from "./pages/Simulador";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dados" element={<Dados />} />
      <Route path="/personas" element={<Personas />} />
      <Route path="/mural" element={<Mural />} />
      <Route path="/simulador" element={<Simulador />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

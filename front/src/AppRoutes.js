import { Route, Routes } from "react-router-dom";
import MarcarConsulta from "./Pages/MarcarConsulta";
import VerConsultas from "./Pages/VerConsultas";

const AppRoutes = () => {
    return(
<Routes>
  <Route path="/" element={<MarcarConsulta />} />
  <Route path="/consultas" element={<VerConsultas />} />
  <Route path="*" element={<div>Página não encontrada</div>} />
</Routes>

    )
 }
 
 export default AppRoutes;
 
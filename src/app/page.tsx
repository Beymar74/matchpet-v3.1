import Comunidad from "./PantallaInicio/Comunidad";
import ExplorarSección from "./PantallaInicio/ExplorarSección";
import Procesodeadopción from "./PantallaInicio/Procesodeadopción";
import Seccióndeestadísticas from "./PantallaInicio/Seccióndeestadísticas";
import Seccióndehéroe from "./PantallaInicio/Seccióndehéroe";
import SeccióndeMascotas from "./PantallaInicio/SeccióndeMascotas";
import Sobrenosotros from "./PantallaInicio/Sobrenosotros";

export default function Home() {
  return (
    <>
      <Seccióndehéroe />
      <Sobrenosotros />
      <Procesodeadopción />
      <SeccióndeMascotas />
      <Comunidad />
      <Seccióndeestadísticas />
      <ExplorarSección />
      {/* You might want to add a Footer component here as well */}
    </>
  );
}

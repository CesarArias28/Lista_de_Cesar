import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  return (
    <div className="container mt-5">
      <h1>Añadir o Editar Contacto</h1>
      <Link to="/" className="btn btn-secondary">Volver a contactos</Link>
    </div>
  );
};


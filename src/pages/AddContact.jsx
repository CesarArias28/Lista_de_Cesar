import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../api.js";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const isEdit = id !== undefined;

  useEffect(() => {
    if (isEdit && store.contacts) {
      const contactToEdit = store.contacts.find((c) => String(c.id) === String(id));
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name || "",
          email: contactToEdit.email || "",
          phone: contactToEdit.phone || "",
          address: contactToEdit.address || ""
        });
      }
    }
  }, [id, isEdit, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    setIsSaving(true);
    try {
      if (isEdit) {
        const updated = await updateContact(formData, id);
        if (updated) {
          dispatch({
            type: "edit_contact",
            payload: updated
          });
          navigate("/");
        } else {
          alert("Error al actualizar el contacto en el servidor.");
        }
      } else {
        const added = await createContact(formData);
        if (added) {
          dispatch({
            type: "add_contact",
            payload: added
          });
          navigate("/");
        } else {
          alert("Error al crear el contacto en el servidor.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Ha ocurrido un error inesperado al guardar el contacto.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "600px", borderRadius: "16px" }}>
        <div className="card-body p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">{isEdit ? "Editar Contacto" : "Añadir Nuevo Contacto"}</h2>
            <Link to="/" className="text-secondary text-decoration-none">
              <i className="fa-solid fa-xmark fs-4"></i>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold text-secondary">Nombre Completo</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-1"
                  id="name"
                  name="name"
                  placeholder="Escribe el nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-secondary">Correo Electrónico</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 ps-1"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold text-secondary">Teléfono</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="tel"
                  className="form-control bg-light border-start-0 ps-1"
                  id="phone"
                  name="phone"
                  placeholder="+34 600 000 000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="form-label fw-semibold text-secondary">Dirección</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-1"
                  id="address"
                  name="address"
                  placeholder="Calle, Ciudad, País"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm transition-all"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Guardando...
                </>
              ) : (
                isEdit ? "Guardar Cambios" : "Crear Contacto"
              )}
            </button>

            <Link to="/" className="btn btn-link w-100 text-center text-muted mt-3 text-decoration-none">
              Volver a la agenda
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};


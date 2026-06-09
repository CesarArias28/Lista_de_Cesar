import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/Contact.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { deleteContact, getContacts } from "../api.js";


export const Home = () => {

	const [contactToDelete, setContactToDelete] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		const fetchAndSetContacts = async () => {
			setIsLoading(true);
			const data = await getContacts();
			dispatch({ type: "set_contacts", payload: data });
			setIsLoading(false);
		};
		fetchAndSetContacts();
	}, [dispatch]);


	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h1 className="fw-bold m-0 text-dark">Lista de Contactos</h1>
			</div>

			<div className="card shadow-sm border-0 mb-5" style={{ borderRadius: "16px", overflow: "hidden" }}>
				{isLoading ? (
					<div className="text-center py-5">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Cargando...</span>
						</div>
						<p className="mt-3 text-secondary">Cargando tu agenda de contactos...</p>
					</div>
				) : store.contacts && store.contacts.length > 0 ? (
					store.contacts.map((item, index) => (
						<ContactCard key={item.id} contact={item} contact2={index} onDelete={(id) => setContactToDelete(id)} />
					))
				) : (
					<div className="text-center py-5 text-muted">
						<i className="fa-solid fa-address-book fs-1 mb-3 text-secondary" style={{ opacity: 0.5 }}></i>
						<p className="m-0 fs-5">No hay contactos guardados en esta agenda.</p>
					</div>
				)}
			</div>

			{contactToDelete !== null && (
				<div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }} tabIndex="-1">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content border-0 shadow" style={{ borderRadius: "16px" }}>
							<div className="modal-header border-0 pt-4 px-4">
								<h5 className="modal-title fw-bold">¿Estás seguro?</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setContactToDelete(null)}
								></button>
							</div>
							<div className="modal-body px-4 py-3 text-secondary">
								<p className="m-0">Si eliminas este contacto, se borrará de forma permanente tanto en tu dispositivo como en el servidor remoto.</p>
							</div>
							<div className="modal-footer border-0 pb-4 px-4 gap-2">
								<button
									type="button"
									className="btn btn-light px-4 py-2 rounded-pill fw-semibold text-secondary"
									onClick={() => setContactToDelete(null)}
								>
									No, cancelar
								</button>
								<button
									type="button"
									className="btn btn-danger px-4 py-2 rounded-pill fw-semibold shadow-sm"
									onClick={async () => {
										const success = await deleteContact(contactToDelete);
										if (success) {
											dispatch({ type: "delete_contact", payload: contactToDelete });
										}
										setContactToDelete(null);
									}}
								>
									Sí, eliminar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;

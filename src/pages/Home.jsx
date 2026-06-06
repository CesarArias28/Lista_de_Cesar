import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/Contact.jsx";
import { useState } from "react";

export const Home = () => {

	const [contactToDelete, setContactToDelete] = useState(null);
	const { store, dispatch } = useGlobalReducer()

	return (

		<div>

			<h1>Lista de Contactos</h1>

			{store.contacts.map((item, index) => (
				<ContactCard key={item.id} contact={item} contact2={index} onDelete={(id) => setContactToDelete(id)} />
			))}

			{contactToDelete !== null && (
				<div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">¿Estás seguro?</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setContactToDelete(null)}
								></button>
							</div>
							<div className="modal-body">
								<p>Si eliminas este contacto, se borrará de forma permanente.</p>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setContactToDelete(null)}
								>
									No, cancelar
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										dispatch({ type: "delete_contact", payload: contactToDelete });
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
	)
}

export default Home;

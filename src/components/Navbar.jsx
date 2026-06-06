import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 mb-4">
			<div className="container">
				<Link to="/" className="navbar-brand d-flex align-items-center gap-2">
					<i className="fa-solid fa-address-book text-primary fs-3"></i>
					<span className="fw-bold tracking-tight">ContactHub</span>
				</Link>
				<div className="d-flex align-items-center gap-3 ms-auto">
					<Link to="/add">
						<button className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2 transition-all">
							<i className="fa-solid fa-plus"></i>
							<span>Añadir contacto</span>
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  return (
    <div className="border-bottom p-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src={contact.image}
            alt={contact.name}
            className="rounded-circle"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        </div>

        <div className="col text-secondary">
          <h5 className="text-dark mb-3">{contact.name}</h5>
          <p className="mb-1">
            <i className="fa-solid fa-location-dot me-2"></i>{contact.address}
          </p>
          <p className="mb-1">
            <i className="fa-solid fa-phone me-2"></i>{contact.phone}
          </p>
          <p className="mb-0">
            <i className="fa-solid fa-envelope me-2"></i>{contact.email}
          </p>
        </div>

        <div className="col-auto align-self-start">

          <Link to={`/edit/${contact.id}`}><i className="fa-solid fa-pencil btn btn-link text-dark p-0 me-3 "></i></Link>
          <button

            className="btn btn-link text-dark p-0"
            onClick={() => dispatch({ type: "delete_contact", payload: contact.id })}
          >
            <i className="fa-solid fa-trash"></i>
          </button>

        </div>
      </div>
    </div>
  );
};
export default ContactCard;
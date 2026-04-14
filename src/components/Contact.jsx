const ContactCard = ({ contact }) => {
  return (
    <div className="border-bottom p-4">
      <div className="row align-items-center">
        {/* Avatar */}
        <div className="col-auto">
          <img 
            src={contact.image} 
            alt={contact.name} 
            className="rounded-circle" 
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        </div>

        {/* Info */}
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

        {/* Actions */}
        <div className="col-auto align-self-start">
          <button className="btn btn-link text-dark p-0 me-3">
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button className="btn btn-link text-dark p-0">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
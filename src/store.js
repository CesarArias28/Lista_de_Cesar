export const initialStore = () => {
  return {
    contacts: [
      {
        id: 1,
        name: "Janna Ramos",
        email: "jane@example.com",
        phone: "123-456-789",
        address: "Barcelona, Born",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Janna%20Ramos"
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      };

    case 'add_contact':
      const newContact = {
        ...action.payload,
        id: action.payload.id || Date.now(),
        image: action.payload.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(action.payload.name)}`
      };
      return {
        ...store,
        contacts: [...(store.contacts || []), newContact]
      };

    case 'delete_contact':
      return {
        ...store,
        contacts: (store.contacts || []).filter((item) => item.id !== action.payload)
      };

    case 'edit_contact':
      return {
        ...store,
        contacts: (store.contacts || []).map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
              image: action.payload.image || item.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(action.payload.name)}`
            };
          }
          return item;
        })
      };

    default:
      return store;
  }
}

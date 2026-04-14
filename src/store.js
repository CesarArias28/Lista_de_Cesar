export const initialStore=()=>{
  return{
    
    contacts: [
  {
  id: 1,
  name: "Janna Ramos",
  email: "jane@example.com",
  phone: "123-456-789",
  address: "Barcelona, Born",
  image: "https://url-de-la-foto.com"
}
]
  }}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'delete_contact':
      return {
        ...store,
       contacts: store.contacts.filter((item) => item.id !== action.payload )
      };

    case 'edit_contact':
      return {
        ...store,
        contacts: store.contacts.map((item) => item.id === action.payload.id ? action.payload : item)
      };

    default:
      return store;
  }
}

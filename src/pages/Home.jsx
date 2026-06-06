import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/Contact.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (

		<div>

			<h1>Lista de Contactos</h1>

			{store.contacts.map((item, index) => (


<ContactCard contact={item} contact2={index} />
  ))}
		</div>
	)
}


export default Home; 


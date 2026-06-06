const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "cesararias28";

const createAgenda = async () => {
    try {
        const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, {
            method: "POST"
        });
        return response.ok;
    } catch (error) {
        console.error("Error al crear la agenda:", error);
        return false;
    }
};

export const getContacts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);

        if (response.status === 404) {
            await createAgenda();
            return [];
        }

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return data.contacts.map((c) => ({
            id: c.id,
            name: c.full_name,
            email: c.email,
            phone: c.phone,
            address: c.address,
            image: c.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.full_name)}`
        }));

    } catch (error) {
        console.error("Error al obtener contactos:", error);
        return [];
    }
};



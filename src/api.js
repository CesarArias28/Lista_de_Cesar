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
            name: c.name || c.full_name || "",
            email: c.email,
            phone: c.phone,
            address: c.address,
            image: c.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name || c.full_name || "")}`
        }));

    } catch (error) {
        console.error("Error al obtener contactos:", error);
        return [];
    }
};

export const createContact = async (contactData) => {
    try {
        const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone,
                address: contactData.address
            })
        });

        if (!response.ok) {
            throw new Error("No se pudo crear el contacto");
        }

        const data = await response.json();
        return {
            id: data.id,
            name: data.name || data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            image: data.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name || data.full_name || "")}`
        };
    } catch (error) {
        console.error("Error al crear contacto:", error);
        return null;
    }
};

export const updateContact = async (contactData, contactId) => {
    try {
        const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: contactData.name,
                email: contactData.email,
                phone: contactData.phone,
                address: contactData.address
            })
        });

        if (!response.ok) {
            throw new Error("No se pudo actualizar el contacto");
        }

        const data = await response.json();
        return {
            id: data.id,
            name: data.name || data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            image: data.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name || data.full_name || "")}`
        };
    } catch (error) {
        console.error("Error al actualizar contacto:", error);
        return null;
    }
};

export const deleteContact = async (contactId) => {
    try {
        const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
            method: "DELETE"
        });
        return response.ok;
    } catch (error) {
        console.error("Error al eliminar contacto:", error);
        return false;
    }
};

import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const {store, dispatch} = useGlobalReducer();

    const deleteContact = async (id) => {
        const deleteURL =  `https://playground.4geeks.com/contact/agendas/jf/contacts/${id}`;

        const response = await fetch(deleteURL, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert(`A problem occurred with the response: ${response.status}, ${response.statusText}`);
        } else {
            getContacts();
        }
    }

    function getContacts(params) {
        const url = "https://playground.4geeks.com/contact/agendas/jf/contacts";
        fetch(url)
        .then((response) => response.json())
        .then((body) => {
            const contacts = body.contacts;
            dispatch({
                type: "update_contacts",
                payload: contacts
            });
        });
    };
    useEffect(() => {
        getContacts()
    }, []);
    return(
        <div className="container mt-5">
		<div className="d-flex justify-content-end py-4">
				<Link to="/new-contact" type="button" className="btn btn-success">Add new contact</Link>
		</div>

        <div className="row">
        {store.contacts.map((contact) => {
           return <ContactCard key={contact.id} contact={contact} onDelete={(e) => {deleteContact(contact.id)}} />
        })}
        </div>
        </div>
    );
};
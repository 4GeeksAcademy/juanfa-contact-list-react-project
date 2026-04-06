import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContactForm = (props) => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { contactId } = useParams();

    const [formsInputs, setFormInputs] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const editForm = async () => {
        const url = `https://playground.4geeks.com/contact/agendas/jf/contacts/${contactId}`;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(formsInputs),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            alert(`A problem occurred with the response: ${response.status}, ${response.statusText}`);
        } else {

            navigate("/contacts");
        }
    };

    useEffect(() => {
        for (const contact of store.contacts) {
            if (contact.id == contactId) {
                setFormInputs({
                    name: contact.name,
                    phone: contact.phone,
                    address: contact.address,
                    email: contact.email
                });
            }
        }
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                   
                    <div className="card shadow-sm border-0 rounded-3 p-4">
                        <h1 className="text-center mb-4 fw-bold text-primary">Edit Contact</h1>
                        
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-semibold text-secondary">Full Name</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    className="form-control form-control-lg bg-light" 
                                    placeholder="Full Name" 
                                    value={formsInputs.name} 
                                    onChange={(event) => setFormInputs({
                                        ...formsInputs,
                                        name: event.target.value
                                    })} 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold text-secondary">Email</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    className="form-control form-control-lg bg-light" 
                                    placeholder="Enter email"
                                    value={formsInputs.email} 
                                    onChange={(event) => setFormInputs({
                                        ...formsInputs,
                                        email: event.target.value
                                    })} 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label fw-semibold text-secondary">Phone</label>
                                <input 
                                    id="phone" 
                                    type="text" 
                                    className="form-control form-control-lg bg-light" 
                                    placeholder="Enter phone"
                                    value={formsInputs.phone} 
                                    onChange={(event) => setFormInputs({
                                        ...formsInputs,
                                        phone: event.target.value
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="form-label fw-semibold text-secondary">Address</label>
                                <input 
                                    id="address" 
                                    type="text" 
                                    className="form-control form-control-lg bg-light" 
                                    placeholder="Enter address"
                                    value={formsInputs.address} 
                                    onChange={(event) => setFormInputs({
                                        ...formsInputs,
                                        address: event.target.value
                                    })} 
                                />
                            </div>

                           
                            <button 
                                type="button" 
                                className="btn btn-primary btn-lg w-100 fw-bold mb-3 shadow-sm" 
                                onClick={editForm}
                            >
                                Update Contact
                            </button>
                            
                            <div className="text-center">
                                <Link to="/contacts" className="text-decoration-none text-muted small">
                                    <i className="bi bi-arrow-left me-1"></i> or get back to contacts
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
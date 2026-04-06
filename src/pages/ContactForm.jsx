import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = (props) => {
    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    
    const [formsInputs, setFormInputs] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const contactSubmit = async () => {
        const url = "https://playground.4geeks.com/contact/agendas/jf/contacts";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(formsInputs),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            alert(`A problem occurred with the response: ${response.status}, ${response.statusText}`);
        } else {
            const newContact = await response.json();
            dispatch({
                type: "update_contacts",
                payload: [...store.contacts, newContact]
            });
            navigate("/contacts"); 
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                   
                    <div className="card shadow-sm border-0 rounded-3 p-4">
                        <h1 className="text-center mb-4 fw-bold">Add new contact</h1>
                        
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
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
                                <label htmlFor="email" className="form-label fw-semibold">Email</label>
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
                                <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
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
                                <label htmlFor="address" className="form-label fw-semibold">Address</label>
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
                                onClick={contactSubmit}
                            >
                                Save Contact
                            </button>
                            
                            <div className="text-center">
                                <Link to="/contacts" className="text-decoration-none text-muted small">
                                    or get back to contacts
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
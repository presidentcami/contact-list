import React, { useState, useReducer, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

  const initialValue = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    notes: '',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

 const MyAddForm = ({ contact, setContacts }) => {


  const [state, dispatch] = useReducer(reducer, initialValue);

  const inputAction = (event) => {
    event.preventDefault();

    dispatch({
      type: 'add',
      payload: { key: event.target.name, value: event.target.value },
    });
    console.log(state)
  };

  //A function to handle the post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8080/api/addcontact/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then(contact => {
          setContacts(contact);
          console.log('Contacts fetched when new contact is added', contact);

        })
      // console.log(state)
      // window.location = "/"; 
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} id="addContactsForm">

        <h3>Add a New Contact</h3>
        <label>First Name</label>
        <input
          type="text"
          id="add-user-name"
          name="first_name"
          required
          value={contact.first_name}
          onChange={inputAction}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="add-user-name"
          name="last_name"
          required
          value={contact.last_name}
          onChange={inputAction}
        />
        <label>Phone Number</label>
        <input
          type="text"
          id="add-user-name"
          name="phone"
          required
          value={contact.phone}
          onChange={inputAction}
        />
        <label>Email</label>
        <input
          type="text"
          id="add-user-name"
          name="email"
          required
          value={contact.email}
          onChange={inputAction}
        />
        <label>Notes</label>
        <div>
        <input
          type="text-area"
          id="add-user-name"
          name="notes"
          value={contact.notes}
          onChange={inputAction}
        /> </div>
        <div>
        <Button type="submit" variant="outline-success" style={{ padding: '0.6em', marginTop: '0.9em' }}>Add Contact</Button> </div>  
    </form>
    
  );
};


export default MyAddForm
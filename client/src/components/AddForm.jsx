import React, { useState, useReducer, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

 // get event handling and submission set up, as well as post request INSERT INTO individuals (nickname, species_id)
// on submit set value to nickname input value and species_id based on species they selected
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

// const Form = ({ setIndividuals, individuals, species }) => {
 const MyAddForm = ({ contact, setContacts, onSaveStudent, editingStudent, onUpdateStudent }) => {
// we need a fetch that gets the list of species that are currently in the table - 
// but not the individuals table, just the species table since there can only be one of each species
// done in parent of Form
  // console.log(individuals, species)

  const [state, dispatch] = useReducer(reducer, initialValue);

  const inputAction = (event) => {
    event.preventDefault();

    dispatch({
      type: 'add',
      payload: { key: event.target.name, value: event.target.value },
    });
    console.log(state)
  };

//   console.log("species", species)

  // found this function via stackoverflow to sort my array of objects (species) by commonname so the drop down would display it properly
//   species.sort(function (a, b) {
//     var textA = a.commonname.toUpperCase();
//     var textB = b.commonname.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//   });

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
          console.log('Events fetched when new contact is added', contact);

        })
      // console.log(state)
      // window.location = "/"; 
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} id="individualsForm">

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
        <input
          type="text-area"
          id="add-user-name"
          name="notes"
          required
          value={contact.notes}
          onChange={inputAction}
        /> 
        <Button type="submit" variant="outline-success">Add Contact</Button>   
    </form>
    
  );
};


export default MyAddForm
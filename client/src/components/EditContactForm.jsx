import React, { useState, useReducer, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

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

 const EditForm = ({ contact, setContacts }) => {


  const [state, dispatch] = useReducer(reducer, initialValue);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(current => !current);

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
      fetch("http://localhost:8080/api/editcontact/", {
        method: "PUT",
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
    <>
    <Button variant="outline-info" onClick={handleShow} style={{ padding: '0.6em' }}> <ioicons.IoSync />
    
    <form onSubmit={handleSubmit} id="contactsForm" show={show}>

        {show ? <> 
        <h3>Edit Contact</h3>
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
            <Button type="submit" variant="outline-success" onClick={handleClose}>Edit Contact</Button> </> : null}  
    </form>
    </Button>
    </>
  );
};


export default EditForm
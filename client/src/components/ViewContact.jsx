import React, { useState, useReducer, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'


 const ViewContact = ({ id, contact }) => {
  // console.log(contact)
  const { first_name, last_name, phone, email, notes } = contact;

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(current => !current);
   const handleShow = () => {

    setShow(!show)
  
  };

    
  return (
    <>
      <Button variant="outline-success" aria-label="Show details" onClick={handleShow} style={{ padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> <ioicons.IoListOutline /> </Button>
  
      {show ? <> 
      <table className="contactTableContainer">
        <tbody>
            <tr>
            <th>Name</th>
            <td>{first_name} {last_name}</td>
            </tr>
            <tr>
            <th>Phone Number</th>
            <td>{phone}</td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{notes}</td>
            </tr>
        </tbody>
      </table>
      </> : null}  
    

    </>
  );
};


export default ViewContact
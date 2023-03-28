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
      <Button variant="outline-success" onClick={handleShow} style={{ padding: '0.6em', marginRight: '0.9em' }}> <ioicons.IoListOutline /> </Button>
  
      {show ? <> 
      <table className=".indTableContainer">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr key={id}>
              <td>{first_name} {last_name}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>{notes}</td>
              </tr>
        </tbody>
      </table>
      </> : null}  
    

    </>
  );
};


export default ViewContact
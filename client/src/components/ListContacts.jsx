import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import MyAddForm from './AddForm';
import Delete from './DeleteContact';
import EditForm from './EditContactForm';

const ListContacts = () => {

    // this is my original state with an array of Contacts 
    const [contacts, setContacts] = useState([]);

    //this is the state needed for the UpdateRequest
    // const [editingStudent, setEditingStudent] = useState(null)

    const loadContacts = () => {
        // A function to fetch the list of contacts that will be load anytime that list change
        fetch("http://localhost:8080/api/contacts")
            .then((response) => response.json())
            .then((contacts) => {
                setContacts(contacts);
            });
    }

    useEffect(() => {
        loadContacts();
    }, [contacts]);

      // found this function via stackoverflow to sort array of objects (contacts) by first_name so it's in alphabetical
  contacts.sort(function (a, b) {
    var textA = a.first_name.toUpperCase();
    var textB = b.first_name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });




    return (
        <div className="mybody">
        <div className="list-contacts">
            <h2>Techtonica Participants </h2>
            <ul>
                {contacts.map((contact) => {
                    return <li key={contact.id}> 
                    <Card>
                        <Card.Body>
                        <Card.Title>{contact.first_name} {contact.last_name}</Card.Title>
                        <Delete id={contact.id} setContacts={setContacts} />
                        <EditForm key={contact.id} id={contact.id} contact={contact} setContacts={setContacts} />
                        </Card.Body>
                    </Card></li>
                })}
            </ul>
        </div>
        <MyAddForm contact={contacts} setContacts={setContacts} />
        </div>
    );
}


export default ListContacts
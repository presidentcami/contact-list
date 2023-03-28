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

    const onSaveStudent = (newStudent) => {
        //console.log(newStudent, "From the parent - List of contacts");
        setContacts((contacts) => [...contacts, newStudent]);
    }


    //A function to control the update in the parent (student component)
    const updateStudent = (savedStudent) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of contacts - 
        loadContacts();
    }

    //A function to handle the Delete funtionality
    const onDelete = (contact) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/contacts/${contact.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadContacts();
            }
        })
    }

    //A function to handle the Update functionality
    // const onUpdate = (toUpdateStudent) => {
    //     //console.log(toUpdateStudent);
    //     setEditingStudent(toUpdateStudent);

    // }



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
                        <Card.Body>
                        <Delete id={contact.id} setContacts={setContacts} />
                        <EditForm key={contact.id} contact={contact} setContacts={setContacts} />
                        </Card.Body>
                        </Card.Body>
                    </Card></li>
                })}
            </ul>
        </div>
        <MyAddForm contact={contacts} setContacts={setContacts} onSaveStudent={onSaveStudent} onUpdateStudent={updateStudent} />
        </div>
    );
}


export default ListContacts
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Student = ({id, toDelete}) => {

    // turn this component into just the delete button, then make another component for editing purposes

// console.log(contacts.first_name)

    const deleteRequest = async (e) => {
        console.log(id)
        e.preventDefault()
        try {
            fetch(`http://localhost:8080/api/contacts/${id}`, {
                method: "DELETE"
            })
                .then((response) => response.json())
                .then(contacts => {
                    setContacts(contacts);
                    console.log("id of deleted contact", id, 'contacts fetched when contact is deleted', contacts);
                })
            // console.log(deleteEvent)
        } catch (err) {
            console.err(err.message)
        }
    }


    const onDelete = (toDeleteStudent) => {
        toDelete(toDeleteStudent)
    }

    return (
        <Card>
            <Card.Body>
            {/* <Card.Title>{contact.first_name} {contact.last_name}</Card.Title> */}
            <Button variant="outline-danger" onClick={deleteRequest} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            {/* <Button variant="outline-info" onClick={()=>{onUpdate(contact)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button> */}
            </Card.Body>
        </Card>
    )

}

export default Student;
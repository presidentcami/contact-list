import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Delete = ({id, setContacts}) => {

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

    return (
    <Button variant="outline-danger" onClick={deleteRequest} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
        // <Card>
                
        // </Card>
    )

}

export default Delete;
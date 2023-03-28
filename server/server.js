const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/contacts', async (req, res) => {
    try {
        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/addcontact', async (req, res) => {
    try {
        const {first_name, last_name, phone, email, notes} = req.body;
      
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const result = await db.query(
            'INSERT INTO contacts(first_name, last_name, phone, email, notes) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, phone, email, notes],
        );
        console.log(result.rows[0]);
        // res.json(result.rows[0]);

        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for students
app.delete('/api/contacts/:contactId', async (req, res) => {
    try {
        const { contactId } = req.params;
        await db.query('DELETE FROM contacts WHERE id=$1', [contactId]);
        console.log("From the delete request-url", contactId);
        
        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a student 
app.put('/api/editcontact/:contactId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const {contactId} = req.params
    const { first_name, last_name, phone, email, notes } = req.body;
    
    console.log("In the server from the url - the student id", contactId);
    console.log("In the server, from the react - the student to be edited", req.body);
    // UPDATE students SET lastname = "something" WHERE id="16";
    const query = `UPDATE contacts SET first_name=$1, last_name=$2, phone=$3, email=$4, notes=$5 WHERE id=${contactId} RETURNING *`;
    const values = [first_name, last_name, phone, email, notes];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);

      const { rows: contacts } = await db.query('SELECT * FROM contacts');
      res.send(contacts);
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});
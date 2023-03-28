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
 const MyAddForm = ({ contact, onSaveStudent, editingStudent, onUpdateStudent }) => {
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
    // console.log(initialValue)
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
          setIndividuals(contact);
          console.log('Events fetched when new contact is added', contact);

        })
      // console.log(state)
      // window.location = "/"; 
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} id="individualsForm" >

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
    </form >
  );
};



//

//     // This is the original State with not initial student 
//     const [student, setStudent] = useState(editingStudent || {
//         firstname: "",
//         lastname: "",
//         is_current: false
//     });

//     //create functions that handle the event of the user typing into the form
//     const handleNameChange = (event) => {
//         const firstname = event.target.value;
//         setStudent((student) => ({ ...student, firstname }));

//     };

//     const handleLastnameChange = (event) => {
//         const lastname = event.target.value;
//         setStudent((student) => ({ ...student, lastname }));
//     };

//     const handleCheckChange = (event) => {
//         const is_current = event.target.checked;
//         //console.log(iscurrent);
//         setStudent((student) => ({ ...student, is_current }));
//     };

//     const clearForm = () => {
//         setStudent({ firstname: "", lastname: "", is_current: false })
//     }

//     //A function to handle the post request
//     const postStudent = (newStudent) => {
//         return fetch("http://localhost:8080/api/students", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newStudent),
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 //console.log("From the post ", data);
//                 //I'm sending data to the List of Students (the parent) for updating the list
//                 onSaveStudent(data);
//                 //this line just for cleaning the form
//                 clearForm();
//             });
//     };

//     //A function to handle the post request
//     const putStudent = (toEditStudent) => {
//         return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(toEditStudent),
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 onUpdateStudent(data);
//                 //this line just for cleaning the form
//                 clearForm();
//             });
//     };


//     //A function to handle the submit in both cases - Post and Put request!
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (student.id) {
//             putStudent(student);
//         } else {
//             postStudent(student);
//         }
//     };

//     return (
//         <Form className='form-students' onSubmit={handleSubmit}>
//             <Form.Group>
//                 <Form.Label>First Name</Form.Label>
//                 <input
//                     type="text"
//                     id="add-user-name"
//                     placeholder="First Name"
//                     required
//                     value={student.firstname}
//                     onChange={handleNameChange}
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Last Name</Form.Label>
//                 <input
//                     type="text"
//                     id="add-user-lastname"
//                     placeholder="Last Name"
//                     required
//                     value={student.lastname}
//                     onChange={handleLastnameChange}
//                 />
//             </Form.Group>
//             <Form.Check
//                 type={'checkbox'}
//                 id={`isCurrent`}
//                 checked={student.is_current}
//                 onChange={handleCheckChange}
//                 label={`Are they in the current program?`}
//             />
//             <Form.Group>
//             <Button type="submit" variant="outline-success">{student.id ? "Edit Student" : "Add Student"}</Button>
//             {student.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
//             </Form.Group>
//         </Form>
//     );
// };


export default MyAddForm
import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Create(props) {
  const [user, setUser] = useState({ firstname: '', lastname: '', gender: '', dob: new Date() });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:5000/users/addUser";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstname: user.firstname, lastname: user.lastname, gender: user.gender, dob: user.dob };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  const onDateChange = (e) => {
    e.persist();
    console.log('e',e, e.target.value, e.target.name)
    setUser({...user, [e.target.name]: new Date(e.target.value)});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstname" id="firstname" placeholder="Enter first name" value={user.firstname} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastname" id="lastname" placeholder="Enter last name" value={user.lastname} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
              <Form.Check type="radio" label="Male" name="gender" id="gendermale" onChange={onChange} value="Male" checked={user.gender === 'Male'} />
              <Form.Check type="radio" label="Female" name="gender" id="genderfemale" onChange={onChange} value="Female" checked={user.gender === 'Female'} />
          </Form.Group>
          <Form.Group>
            <Form.Label>DOB</Form.Label>
            <Form.Control type="date" name="dob" id="dob" placeholder="Enter date of birth" value={`${new Date(user.dob).getFullYear()}-${new Date(user.dob).getMonth() + 1 > 9 ? new Date(user.dob).getMonth() + 1 : `0${new Date(user.dob).getMonth() + 1}`}-${new Date(user.dob).getDate() > 9 ? new Date(user.dob).getDate() : `0${new Date(user.dob).getDate()}`}`} onChange={onDateChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Create);

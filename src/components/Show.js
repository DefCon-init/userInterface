import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const getUrl = "http://localhost:5000/users/getUser/" + props.match.params.id;
  const deleteUrl = "http://localhost:5000/users/deleteUser";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(getUrl);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  // eslint-disable-next-line
  }, []);

  const editUser = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteUser = (id) => {
    console.log('id', id)
    setShowLoading(true);
    const data = { id }
    axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      {!!data && !!data.firstname && !!data.lastname && !!data.gender && !!data.dob && <Jumbotron>
        <h1>{`${data.firstname} ${data.lastname}`}</h1>
        <p>{data.gender}</p>
        <p>DOB: {`${new Date(data.dob).getDate() > 9 ? new Date(data.dob).getDate() : `0${new Date(data.dob).getDate()}`}/${new Date(data.dob).getMonth() + 1 > 9 ? new Date(data.dob).getMonth() + 1 : `0${new Date(data.dob).getMonth() + 1}`}/${new Date(data.dob).getFullYear()}`}</p>
        <p>
          <Button type="button" variant="primary" onClick={() => { editUser(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteUser(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>}
    </div>
  );
}

export default withRouter(Show);

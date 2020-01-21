import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Fontawesome from "react-fontawesome";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/users/getAll";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/show/" + id
    });
  };

  const redirectToAdd = id => {
    props.history.push({
      pathname: "/create"
    });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      )}
      {!showLoading && data.length === 0 && (
        <p style={{ textAlign: "center", padding: 15 }}>
          No Users found!! <br />
          <p style={{ padding: 10 }}>
            Click here{" "}
            <Button variant='primary' onClick={redirectToAdd}>
              Add
            </Button>{" "}
            to add users
          </p>
        </p>
      )}
      {!showLoading && !!data && data.length > 0 && (
        <ListGroup>
          {data.map(item => (
            <ListGroup.Item
              key={item._id}
              action
              onClick={() => {
                showDetail(item._id);
              }}>
              {`${item.firstname} ${item.lastname}`}
              <Fontawesome name='arrow-right' style={{padding:8}}></Fontawesome>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default withRouter(List);

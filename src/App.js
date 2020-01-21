import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import List from './components/List';
import { withRouter } from 'react-router-dom';

function App(props) {
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/list">List User</Nav.Link> */}
          <Nav.Link href="/create">Add User</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    {props.location.pathname === '/' && <List></List>}
    </div>
  );
}

export default withRouter(App);

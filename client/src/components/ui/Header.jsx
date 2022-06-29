import React, { Fragment } from 'react';
import { Row, Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = ({user, logout}) => {

   return (
      <header>
         <Container fluid>
            <Row>
               <Navbar bg="light" expand="lg">
                  <Container>
                     <Navbar.Brand as={NavLink} to="/">TodoList</Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbar-nav" />
                     <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                           {user ? 
                           <Fragment>
                              <span>{user.username}</span>
                              &nbsp;
                              <Button variant="outline-danger" onClick={logout}>Logout</Button>
                           </Fragment>
                           :
                           <Fragment>
                              <NavLink to="/login" className={({isActive}) => {
                                 return isActive ? 'nav-link active' : 'nav-link';
                              }}>Login</NavLink>
                              <NavLink to="/register" className={({isActive}) => {
                                 return isActive ? 'nav-link active' : 'nav-link';
                              }}>Register</NavLink>
                           </Fragment>
                           }
                        </Nav>
                     </Navbar.Collapse>
                  </Container>
               </Navbar>
            </Row>
         </Container>
      </header>
   )
}

export default Header;

import React, { Component } from 'react';
import '../App.css';
import {Form, Nav,NavDropdown,Navbar} from 'react-bootstrap'


class NavMenu extends Component{
  
  render(){
    return(

      <Navbar style={{backgroundColor:"#145fa7"}} expand="lg">
<Navbar.Brand href="#Login" style={{color:"white"}}>COVID-19 Dashboard</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
  <Nav.Link href="/Worldcharts" style={{color:"white"}}>World</Nav.Link>
    <Nav.Link href="/Indiacharts" style={{color:"white"}}>India</Nav.Link>
    <Nav.Link href="/TScharts" style={{color:"white"}}>Telangana</Nav.Link>
    <Nav.Link href="/Apcharts" style={{color:"white"}}>Andhra Pradesh</Nav.Link>
    

    <NavDropdown title="Choropleth Maps" id="basic-nav-dropdown">
      <NavDropdown.Item href="/AP">Andhra Pradesh</NavDropdown.Item>
      <NavDropdown.Item href="/TS">Telangana</NavDropdown.Item>
 	<NavDropdown.Item href="/Indiamap">India</NavDropdown.Item>
      <NavDropdown.Item href="/Worldmap">World</NavDropdown.Item>

      
    </NavDropdown>
  </Nav>
  <Form inline>
   
  </Form>
</Navbar.Collapse>
</Navbar>


    )
  }
}

export default NavMenu

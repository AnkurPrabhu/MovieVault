import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
export default function Navbarcompo({ searchtext, setSearchText }) {
  const navigate = useNavigate();

  const updatesearchtext = (e) => {
    navigate("/search");
    setSearchText(e.target.value);
  };
  let showlinks = <></>;
  if (localStorage.getItem("id") != null) {
    showlinks = (
      <>
        {" "}
        <Nav.Link href="/watchlist">watch List</Nav.Link>
        <Nav.Link href="/watched"> Watched List</Nav.Link>{" "}
      </>
    );
  }

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/search">MovieFlix</Navbar.Brand>

        <Nav className="me-auto">{showlinks}</Nav>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchtext}
            onChange={updatesearchtext}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

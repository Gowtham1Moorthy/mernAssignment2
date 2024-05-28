import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

var search = 'sddddddddd';
export {search};
export default function NavBarMern() {

    function searchGetting(e){
        search = e.target.value;
    }
    const [logining, setlogining] = useState("Login");
    const navigate = useNavigate();

    const btnStule = {
        border:"none",
        backgroundColor:"white"
    }

    function verifyLogin(){
        if(localStorage.getItem("token")){
            setlogining('')
        }else{
            navigate('/login')
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" style={{position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white'}}>
                <Container>
                    <Navbar.Brand href="#home">Forum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                    onChange={searchGetting}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button>Submit</Button>
                            </Col>
                        </Row>
                    </Navbar.Collapse>
                    <Form inline>
                        <Row>
                            {/* <Col xs="auto">
                               <button onClick={verifyLogin} style={btnStule}> log</button>
                            </Col> */}
                            <Col xs="auto">
                                <Button>Create Account?</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
        </>
    );
}
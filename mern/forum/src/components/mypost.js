import React, { useEffect, useState } from "react";
import NavBarMern, { search } from "./nav";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { SlLike } from "react-icons/sl";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { RiShareForwardLine } from "react-icons/ri";
import { Link, json, useNavigate } from "react-router-dom";
import { MdHeight } from "react-icons/md";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


export default function App() {

    const [forum, setforum] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token.length !== 0) {
            axios.post("http://localhost:5000/token", { token })
                .then(response => {
                    if (response.data.forum) {
                        localStorage.setItem("userForum", JSON.stringify(response.data.forum));
                        setforum(response.data.forum)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }else{
            navigate("/");
        }
    }, []);

    // useEffect(() => {
    //     axios.post("http://localhost:5000/general")
    //     .then(response =>{
    //         localStorage.setItem("forum", JSON.stringify(response.data.forum));
    //         setforum(response.data.forum);
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     });
    // }, []);

    const bodyStyle = {
        backgroundColor: "#f0f0f0",
    };

    const symbols = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#21252908",
    };

    const [like1] = useState("black")

    function likeing(thing) {
        if (thing === "black") {
            thing = "red";
        } else {
            thing = "black";
        }
    }

    const like = {
        color: like1
    }

    const buttonStyle = {
        border: "none",
        backgroundColor: "#21252908",
    }

    const cardCentring = {
        width: "100%",
        display: "flex",

    }
    const firstChild = {
        width: "25%",
        margin: "15px",
    }

    const cardChild = {
        width: "50%",
    }

    const btnSide = {
        width: "100%",
        // borderBottom: "1px solid  black",
        display: "flex",
        justifyContent: "center",
    }

    const createButton = {
        margin: "10px"
    }

    const titleHome = {
        fontSize: "large",
        fontWeight: "bold",
        marginTop: "10px",
        marginBottom: "10px"
    }

    const leftHomeDiv = {
        marginTop: "20px",
        marginBottom: "25px"
    }

    const [search, setsearch] = useState('');

    function searchGetting(e) {
        setsearch(e.target.value);
    }
    const [lgShow, setLgShow] = useState(false);

    const navigate = useNavigate();

    function verifyLogin() {
        if (localStorage.getItem('token')) {
            setLgShow(true)
        } else {
            navigate("/login");
        }
    }

    const [image, setimage] = useState('');
    const [title, settitle] = useState('');
    const [subject, setsubject] = useState('');
    const [content, setcontent] = useState('');

    function imageGetting(e) {
        setimage(e.target.value);
    }

    function titleGetting(e) {
        settitle(e.target.value);
    }

    function subjectGetting(e) {
        setsubject(e.target.value);
    }

    function contentGetting(e) {
        setcontent(e.target.value);
    }

    const [responseForForm, setresponseForForm] = useState('');

    function formSubmit() {
        if (image.length !== 0 && title.length !== 0 && subject.length !== 0 && content.length !== 0 && token.length !== 0) {
            axios.post("http://localhost:5000/newPost", { image, title, subject, content, token })
                .then(response => {
                    if (!response.data.error) {
                        window.location.reload();
                    } else {
                        setresponseForForm("Problem in form Submition");
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            // generalfun();
        } else {
            setresponseForForm("All values are Required");
        }
    }

    // function generalfun(){
    //     axios.post("http://localhost:5000/general")
    //     .then(response =>{
    //         localStorage.setItem("forum", JSON.stringify(response.data.forum));
    //         setforum(response.data.forum);
    //         console.log(forum)
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     });
    // }

    const [logining, setlogining] = useState("Login");
    // const navigate = useNavigate();

    const btnStule = {
        border: "none",
        backgroundColor: "white"
    }

    function verifyLogin2() {
        if (localStorage.getItem("token")) {
            setlogining('')
        } else {
            navigate('/login')
        }
    }

    function mypost() {
        navigate("/mypost");
    }

    const [editId, seteditId] = useState('');

    function edit(i){

        setimage(i.image);
        settitle(i.title);
        setsubject(i.subject);
        setcontent(i.content);
        seteditId(i.id);
        
        setLgShow(true);
    }

    function editval(){
        axios.put("http://localhost:5000/edit", {id:editId, token, image, content, title, subject})
        .catch(err=>{
            console.log(err);
        });
        window.location.reload()
    }

    function Delete(i){
        axios.post("http://localhost:5000/delete", {id:i, token, image, content, title, subject})
        .catch(err=>{
            console.log(err);
        });
        window.location.reload()
    }

    return (
        <body style={bodyStyle}>
            <div>
                <Navbar expand="lg" className="bg-body-tertiary" style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }}>
                    <Container>
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
                                    <Button onClick={mypost}>Post</Button>
                                </Col>
                            </Row>
                        </Navbar.Collapse>
                        <Form inline>
                            <Row>
                                <Col xs="auto" onClick={verifyLogin2}>
                                    <Link to={"/login"}>Log in</Link>
                                </Col>
                                <Col xs="auto">
                                    <Link to={"/signup"}>Sign up</Link>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Navbar>


                <div style={cardCentring}>
                    <div style={firstChild}>
                        <div style={btnSide}>
                            <Modal
                                size="lg"
                                show={lgShow}
                                onHide={() => setLgShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Post
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>{responseForForm}</div>
                                    <div>
                                        <label for="title">Image</label>
                                        <input type="text" placeholder="Image" value={image} onChange={imageGetting} style={{ width: "100%" }}></input><br /><br />
                                    </div>
                                    <div>
                                        <label for="title">Title</label>
                                        <input type="text" placeholder="Image" value={title} onChange={titleGetting} style={{ width: "100%" }}></input><br /><br />
                                    </div>
                                    <div>
                                        <label>Subject</label>
                                        <input type="text" placeholder="Subject" value={subject} onChange={subjectGetting} style={{ width: "100%" }}></input><br /><br />
                                    </div>
                                    <textarea cols={"width"} style={{ width: "100%" }} value={content} onChange={contentGetting}>Content</textarea>
                                    <Button style={createButton} onClick={editval}>Submit</Button>
                                </Modal.Body>
                            </Modal>
                            {/* <Button style={createButton} >Create Post</Button> */}
                        </div>
                    </div>
                    <div style={cardChild}>
                        {
                            forum.map((item, i) => (
                                (
                                    (
                                        item.title.toLowerCase().includes(search.toLowerCase()) ||
                                        item.subject.toLowerCase().includes(search.toLowerCase()) ||
                                        item.content.toLowerCase().includes(search.toLowerCase())
                                    ) ? (
                                        <div style={{ marginTop: "10px" }}>
                                            <Card key={i}>
                                                <Card.Body>
                                                    <Link to={`/readmore/${item.id}`}><Card.Title>{i + 1}. {item.title}</Card.Title></Link>
                                                    <Card.Text>{item.subject}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer style={symbols}>
                                                    <small className="text-muted">Posted on : {item.date}</small>
                                                    <div>
                                                    <Button onClick={() => {edit(item)}}>Edit</Button>
                                                    <Button onClick={() => {Delete(item.id)}}>Delete</Button>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    )
                                        : (null)
                                )
                            ))
                        }
                    </div>
                    <div style={firstChild}>
                         
                    </div>
                </div>


                {/* <Footer id='footer' /> */}
            </div>

        </body>
    );
}
import { Form, Container, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import logo from '../assets/image/D.png';
import "../style/style.css";
import { useHistory, Link } from "react-router-dom";


function LForm() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    //login
    const handleEmailChange = e => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch("http://localhost:3000/course_ms/login", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
        if (result.status === 401) {
            setMsg(true);
        } else {
            result = await result.json();
            console.warn(result)
            localStorage.setItem('token', JSON.stringify(result));
            history.push("/muser");
        }
    }
    return (
        <div className="bgLogin">
            <div className="space">
                <Container className="Flogin">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                <img src={logo} alt="logo awal" className="logoD rounded-circle"/>
                                <div className="text-muted p-2">Dashboard</div>
                                <h3>Log In to Dasboard</h3>
                                <div className="text-muted p-2 mt-3">Enter your email and password below</div>
                            </Card.Title>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <p className="has-text-centered"></p>
                                    {msg ? (
                                        <div className="alert alert-danger" role="alert">
                                            Login gagal, email atau password salah
                                        </div>)
                                        : (<></>)}
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label>EMAIL</Form.Label>
                                        <Form.Control size="lg" type="email" placeholder="Email address"
                                            onChange={handleEmailChange} value={email} />
                                        
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="d-flex justify-content-between">
                                            <div>PASSWORD </div>
                                            <Link className="text-decoration-none text-dark coba ">Forgot password?</Link>
                                        </Form.Label>
                                        <Form.Control size="lg" type="password" placeholder="Password"
                                            onChange={handlePasswordChange} value={password}
                                        />
                                    </Form.Group>
                                    <div className="d-grid mb">
                                        <Button variant="primary" type="submit" className="button is-success coba is-fullwidth"
                                        >
                                            Log In
                                        </Button>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}


export default LForm;
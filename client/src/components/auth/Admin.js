import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Alert, Row, Col, InputGroup } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa'
// import './login.css'

const Admin = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    let history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                url: "api/auth/admin_login",
                method: "POST",
                data: { username, password },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response) {
                const { token } = response.data
                console.log(token);
                localStorage.setItem('token', token);
                setShow(false)
                history.push('/admin_panel')
            }
        } catch (error) {
            setShow(true)
            setError(error.response.data.msg)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5" >

            <div className="container" >
                <div className=" col-xl-5  offset-md-4  login  z-depth-2">
                    {show ? <Alert variant='danger'>
                        {error}
                    </Alert> : null}
                    {submitted && <Alert variant='success'>Success! You are logged in.</Alert>}


                    <Form onSubmit={handleSubmit} >
                        <Form.Group controlId="formBasicUsername" className="my-1">
                            <Form.Label> Username</Form.Label>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FaUserAlt />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)} />

                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label> Password</Form.Label>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FaLock />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="danger" className="w-50" type="submit">Login</Button>
                        </div>
                    </Form>
                </div>

            </div>

        </div>
    )
}

export default Admin

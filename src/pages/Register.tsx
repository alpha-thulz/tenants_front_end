import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router";
import client from "../utils/connect.ts";
import {useState} from "react";
import Alert from "../components/Alert.tsx";

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.value);
    }

    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(e.target.value);
    }

    const handleFormSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (firstname.trim().length <= 0 || lastname.trim().length <= 0 || email.trim().length <= 0 || username.trim().length <= 0 || password.trim().length <= 0) {
            setError('Please fill in all fields');
            setIsAlertOpen(true);
            return;
        }

        if (password !== passwordRepeat) {
            setIsAlertOpen(true);
            setError('Passwords must match');
            return;
        }

        client("").post("/api/v1/users/register", {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "password": password,
            "email": email,
            "enabled": true,
            "role": "MANAGER"
        }).then((res) => {
            if(res.status === 201) {
                navigate("/");
            } else if (res.status === 409) {
                setError(res.response.data.message);
                setIsAlertOpen(true);
            }
        }).catch((error) => {
            console.log(error);
            setError("Invalid credentials");
            setIsAlertOpen(true);
        });
    }

    return (
        <div className="container">
            <div className="container-fluid">
                { isAlertOpen && (<Alert color="danger" onClose={() => setIsAlertOpen(false) }>{error}</Alert>)}
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="firstname" onChange={handleFirstnameChange}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastname" onChange={handleLastnameChange}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username" onChange={handleUsernameChange}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email" onChange={handleEmailChange}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password" onChange={handlePasswordChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password_repeat" onChange={handlePasswordRepeatChange}>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password again"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >Register</Button>
                    <p>Already have an account? Let's <Link to={"/login"}>login</Link> right away</p>
                </Form>
            </div>
        </div>
    );
}
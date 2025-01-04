import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import client from "../utils/connect.ts";
import Alert from "../components/Alert.tsx";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        client("").post("/api/v1/users/login", {
            "username": username,
            "password": password
        }).then((response) => {
            if(response.status === 200) {
                navigate("/");
            } else if (response.status === 409) {
                setError(response.data.message);
                setIsAlertOpen(true);
            }
        }).catch(() => {
            setError("Invalid credentials");
            setIsAlertOpen(true);
        });
    }

    return (
        <div className="container">
            <div className="container-fluid">
                { isAlertOpen && (<Alert color="danger" onClose={() => setIsAlertOpen(false) }>{error}</Alert>)}
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="username" onChange={handleUsernameChange}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password" onChange={handlePasswordChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                    <p>Don't have an account? Let's <Link to={"/register"}>create</Link> one right away</p>
                </Form>
            </div>
        </div>
    );
}
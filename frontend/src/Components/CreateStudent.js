import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        
    };

    const formStyle = {
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const inputStyle = {
        marginBottom: '16px',
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8081/create', { name, email })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2>ADD STUDENT</h2>
                <form onSubmit={handleSubmit}>
                    <div style={inputStyle}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={inputStyle}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

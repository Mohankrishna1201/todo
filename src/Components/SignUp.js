import React, { useState } from 'react';
import "./Signin.css"
const SignUp = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };
        const response = await fetch('http://127.0.0.1:8000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.error('Error:', await response.text());
            return;
        }

        const data = await response.json();
        // Handle successful signup (e.g., redirect to login page)

    };

    return (
        <section className="center">
            <main className="todo-app">
                <header className="app-title">
                    <h1 className="head-border">Todo</h1>
                </header>
                <section className="login-section">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="visually-hidden">
                                Email
                            </label>
                            <h7>
                                email:
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="form-input email"
                                    placeholder="_________________"
                                />
                            </h7>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="visually-hidden">
                                Password
                            </label>
                            <h7>
                                password:
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="form-input password"
                                    placeholder="__________________"
                                />
                            </h7>
                        </div>
                        <button type="submit" className="login-button">
                            Sign Up
                        </button>
                    </form>
                </section>
            </main>
        </section>
    );
};

export default SignUp;

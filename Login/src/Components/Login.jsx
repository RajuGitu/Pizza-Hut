import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Component/Login.module.css";
import { useCart } from "../context/CartContext";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const { setUser, setFetching } = useCart();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:8080/practice/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
        });
    
        const data = await response.json();
        if (response.ok) {
            setMessage(data.message);
            setUser(data.userName);
            setFetching(true);
    
            // Store token in localStorage
            localStorage.setItem("token", data.token);  // Save token to localStorage
    
            navigate('/order/Pizza');
            console.log(data.token);
        } else {
            setMessage("Error submitting form");
            console.error("Failed to submit form");
        }
    };
    

    // Function to navigate to /order/Pizza directly when Skip button is clicked
    const handleSkip = () => {
        setUser('/0');
        navigate('/order/Pizza');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login Form</h2>

            {/* Message */}
            {message && <p className={styles.error}>{message}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Email Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your email"
                    />
                </div>
                {/* Password Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>

            {/* Forgot Password Link */}
            <div className={styles.forgotPassword}>
                <Link to="/ForgotPassword" className={styles.forgotPasswordLink}>
                    Forgot Password?
                </Link>
            </div>

            {/* Signup Button */}
            <div className={styles.signup}>
                <Link to="/signup" className={styles.signupLink}>
                    Signup
                </Link>
            </div>

            {/* Skip Button */}
            <div className={styles.skipButton}>
                <button onClick={handleSkip} className={styles.button}>
                    Skip and Go to Menu
                </button>
            </div>
        </div>
    );
};

export default Login;

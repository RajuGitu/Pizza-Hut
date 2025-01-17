import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Component/SignUp.module.css"; // Import CSS module
import { useCart } from "../context/CartContext";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");  // New field for security answer
    const [message, setMessage] = useState("");

    const { setUser, setFetching } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send form data to the backend
        const response = await fetch("http://localhost:8080/practice/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, password, phone, email, address, securityAnswer }),  // Include securityAnswer
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);
            setUser(userName);
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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Signup Form</h2>

            {/* Message */}
            {message && <p className={styles.error}>{message}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Username */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your username"
                    />
                </div>

                {/* Password */}
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

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* Email */}
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

                {/* Address */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Address:</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={styles.textarea}
                        placeholder="Enter your address"
                    />
                </div>

                {/* Security Question (Answer) */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>What is your pet's name?</label>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        className={styles.input}
                        placeholder="Answer the security question"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>

            {/* Login Button */}
            <div className={styles.login}>
                <Link to="/login" className={styles.link}>
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
};

export default SignUp;

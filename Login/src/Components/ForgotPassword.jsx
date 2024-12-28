import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Component/ForgotPassword.module.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");  // New password state
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send form data to the backend
        const response = await fetch("http://localhost:5000/practice/forgotpassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, answer, newPassword }),  // Pass newPassword to backend
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(data.message);
            // Redirect to the login page after successful password reset
            setTimeout(() => navigate('/login'), 2000); 
        } else {
            setMessage("Error submitting form");
            console.error("Failed to submit form");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Forgot Password</h2>

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
                        required
                    />
                </div>

                {/* Answer to security question */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>What is your pet's name?</label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className={styles.input}
                        placeholder="Answer the security question"
                        required
                    />
                </div>

                {/* New Password Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your new password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

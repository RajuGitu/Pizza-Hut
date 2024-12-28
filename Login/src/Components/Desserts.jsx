import React, { useState, useEffect } from "react";
import styles from "../Component/Sides.module.css"; // Reusing the same CSS for consistency
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const Desserts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Store desserts data as an array
    const { setFetching } = useCart();

    // Fetch desserts data when the component mounts
    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const response = await fetch('http://localhost:5000/practice/desserts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                setData(result); // Store the result (array of objects)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDesserts(); // Automatically fetch data
    }, []); // Empty dependency array ensures fetch only happens once

    const handleSubmit = async (dessert) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login First");
                navigate("/login");
                return;
            }
            const response = await fetch('http://localhost:5000/practice/addcart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    img: dessert.img,
                    prices: dessert.prices,
                    tittle: dessert.tittle,
                    menu: dessert.menu,
                    calories: dessert.calories
                })
            });

            // Handle the response
            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true); // Trigger fetching update
        } catch (error) {
            console.log("Error adding to cart:");
        }
    };

    return (
        <>
            {/* Container */}
            <div className={styles.container}>
                {data.map((dessert) => (
                    <div key={dessert._id} className={styles.card}>
                        {/* Image */}
                        <img src={dessert.img} alt={dessert.tittle} className={styles.image} />

                        {/* Content */}
                        <div>
                            {/* Title and Veg Icon in Row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <h3 className={styles.title}>{dessert.tittle}</h3>
                                {dessert.menu === "veg" &&
                                    <img
                                        src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                {dessert.menu === "non-veg" &&
                                    <img
                                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                            </div>

                            {/* Calories */}
                            <p className={styles.calories}>{dessert.calories}</p>

                            {/* Description */}
                            <p className={styles.description}>{dessert.description}</p>

                            {/* Price */}
                            <p className={styles.price}>Price: ₹{dessert.prices}</p>

                            {/* Add Button */}
                            <button
                                className={styles.addBtn}
                                onClick={() => handleSubmit(dessert)} // Pass dessert data on click
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Desserts;

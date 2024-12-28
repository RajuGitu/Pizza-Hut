import React, { useState, useEffect } from "react";
import styles from "../Component/Sides.module.css"; // Reusing the same CSS for consistency
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const Sides = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Store sides data as an array
    const { setFetching } = useCart();

    // Fetch sides data when the component mounts
    useEffect(() => {
        const fetchSides = async () => {
            try {
                const response = await fetch('http://localhost:5000/practice/sides', {
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

        fetchSides(); // Automatically fetch data
    }, []); // Empty dependency array ensures fetch only happens once

    const handleSubmit = async (side) => {
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
                    img: side.img,
                    prices: side.prices,
                    tittle: side.tittle,
                    menu: side.menu,
                    calories: side.calories
                })
            });

            // Handle the response
            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true); // Trigger fetching update
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    return (
        <>
            {/* Container */}
            <div className={styles.container}>
                {data.map((side) => (
                    <div key={side._id} className={styles.card}>
                        {/* Image */}
                        <img src={side.img} alt={side.tittle} className={styles.image} />

                        {/* Content */}
                        <div>
                            {/* Title and Veg Icon in Row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <h3 className={styles.title}>{side.tittle}</h3>
                                {side.menu === "veg" &&
                                    <img
                                        src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                {side.menu === "non-veg" &&
                                    <img
                                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                            </div>

                            {/* Calories */}
                            <p className={styles.calories}>{side.calories}</p>

                            {/* Description */}
                            <p className={styles.description}>{side.description}</p>

                            {/* Price */}
                            <p className={styles.price}>Price: ₹{side.prices}</p>

                            {/* Add Button */}
                            <button
                                className={styles.addBtn}
                                onClick={() => handleSubmit(side)} // Pass side data on click
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

export default Sides;

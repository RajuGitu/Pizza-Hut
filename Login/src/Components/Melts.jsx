import React, { useState, useEffect } from "react";
import styles from "../Component/Melts.module.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const Melts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Store melts data as an array

    const { setFetching } = useCart();

    // Fetch melts data immediately when the component renders
    useEffect(() => {
        const fetchMelts = async () => {
            try {
                const response = await fetch('http://localhost:5000/practice/melts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                setData(result); // Store the result (array of melts objects)
            } catch (error) {
                console.error("Error fetching melts data:");
            }
        };

        fetchMelts(); // Automatically fetch melts data when component is mounted
    }, []); // Empty dependency array ensures fetch only happens once

    const handleSubmit = async (melt) => {
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
                    img: melt.img,
                    prices: melt.prices,
                    tittle: melt.tittle,
                    menu: melt.menu,
                    calories: melt.calories
                })
            });

            // Handle the response
            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true); // Trigger fetching state update
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    return (
        <>
            {/* Container */}
            <div className={styles.container}>
                {data.map((melt) => (
                    <div key={melt._id} className={styles.card}>
                        {/* Image */}
                        <img src={melt.img} alt={melt.tittle} className={styles.image} />

                        {/* Content */}
                        <div>
                            {/* Title and Veg Icon in Row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <h3 className={styles.title}>{melt.tittle}</h3>
                                {melt.menu === "veg" &&
                                    <img
                                        src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                {melt.menu === "non-veg" &&
                                    <img
                                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                                        alt="non-veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                            </div>

                            {/* Calories */}
                            <p className={styles.calories}>{melt.calories}</p>

                            {/* Description */}
                            <p className={styles.description}>{melt.description}</p>

                            {/* Price */}
                            <p className={styles.price}>Price: ₹{melt.prices}</p>

                            {/* Add Button */}
                            <button
                                className={styles.addBtn}
                                onClick={() => handleSubmit(melt)} // Pass melt data on click
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

export default Melts;

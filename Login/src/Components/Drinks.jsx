import React, { useState, useEffect } from "react";
import styles from "../Component/Drinks.module.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const Drinks = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Store data as an array

    const { setFetching } = useCart();

    // Fetch data immediately when the component renders
    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch('http://localhost:8080/practice/drinks', {
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

        fetchDrinks(); // Automatically fetch data when component is mounted
    }, []); // Empty dependency array ensures fetch only happens once

    const handleSubmit = async (drink) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login First");
                navigate("/login");
                return;
            }
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    img: drink.img,
                    prices: drink.prices,
                    tittle: drink.tittle,
                    menu: drink.menu,
                    calories: drink.calories
                })
            });

            // Handle the response
            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true); // Confirmation alert
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    return (
        <>
            {/* Container */}
            <div className={styles.container}>
                {data.map((drink) => (
                    <div key={drink._id} className={styles.card}>
                        {/* Image */}
                        <img src={drink.img} alt={drink.tittle} className={styles.image} />

                        {/* Content */}
                        <div>
                            {/* Title and Veg Icon in Row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <h3 className={styles.title}>{drink.tittle}</h3>
                                {drink.menu === "veg" &&
                                    <img
                                        src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                {drink.menu === "non-veg" &&
                                    <img
                                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                            </div>

                            {/* Calories */}
                            <p className={styles.calories}>{drink.calories}</p>

                            {/* Description */}
                            <p className={styles.description}>{drink.description}</p>

                            {/* Price */}
                            <p className={styles.price}>Price: ₹{drink.prices}</p>

                            {/* Add Button */}
                            <button
                                className={styles.addBtn}
                                onClick={() => handleSubmit(drink)} // Pass drink data on click
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

export default Drinks;

import React, { useState, useEffect } from "react";
import styles from "../Component/Pizza.module.css"; // Assuming styles are defined here
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const PizzaCard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Store data as an array
    const [selectedSizes, setSelectedSizes] = useState({}); // To track selected size
    const { setFetching } = useCart();

    // Fetch data from the backend when the component renders
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:8080/practice/pizzas', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                setData(result); // Store the result (array of objects)

                // Initialize default size as 'Personal Pan' for each pizza
                const initialSizes = {};
                result.forEach((pizza) => {
                    initialSizes[pizza._id] = "Personal Pan"; // Default size
                });
                setSelectedSizes(initialSizes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPizzas();
    }, []); // Empty dependency array ensures fetch only happens once

    // Handle add-to-cart functionality
    const handleSubmit = async (pizza) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please Login First");
                navigate("/login");
                return;
            }

            const size = selectedSizes[pizza._id];
            const price = pizza.prices[size];
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    img: pizza.img,
                    prices: price,
                    tittle: pizza.tittle,
                    menu: pizza.menu,
                    calories: pizza.calories,
                })
            });

            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }

            setFetching(true);
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    // Handle size change
    const handleSizeChange = (id, size) => {
        setSelectedSizes({ ...selectedSizes, [id]: size }); // Update selected size
    };

    return (
        <>
            {/* Container */}
            <div className={styles.container}>
                {data.map((pizza) => (
                    <div key={pizza._id} className={styles.card}>
                        {/* Image */}
                        <img src={pizza.img} alt={pizza.tittle} className={styles.image} />
                        <div>

                            {/* Title and Veg Icon */}
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <h3 className={styles.title}>{pizza.tittle}</h3>
                                {pizza.menu === "veg" &&
                                    <img
                                        src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                {pizza.menu === "non-veg" &&
                                    <img
                                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                                        alt="veg-icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                            </div>

                            <p className={styles.calories}>{pizza.calories}</p>
                            {/* Description */}
                            <p className={styles.description}>{pizza.description}</p>

                            {/* Size Dropdown */}
                            <label htmlFor={`size-${pizza._id}`} style={{ marginRight: "10px" }}>
                                Select your size & crust
                            </label>
                            <select
                                id={`size-${pizza._id}`}
                                value={selectedSizes[pizza._id]}
                                onChange={(e) => handleSizeChange(pizza._id, e.target.value)}
                                style={{ padding: "5px", borderRadius: "5px" }}
                            >
                                {Object.keys(pizza.prices).map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>

                            {/* Price Based on Selected Size */}
                            <p className={styles.price}>
                                Price: ₹{pizza.prices[selectedSizes[pizza._id]]}
                            </p>

                            {/* Add to Cart Button */}
                            <button
                                className={styles.addBtn}
                                onClick={() => handleSubmit(pizza)} // Pass pizza data
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

export default PizzaCard;

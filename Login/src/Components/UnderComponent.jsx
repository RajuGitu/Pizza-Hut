import { useState, useEffect } from 'react';
import styles from '../Component/UnderComponent.module.css';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from "react-router-dom";

const UnderComponent = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const { fetching, setFetching } = useCart(); // Access context values

    useEffect(() => {
        if (fetching) {
            fetchCart();
            setFetching(false); // Reset fetching state
        }
    }, [fetching]); // Dependency on fetching state

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                return;
            }

            const result = await response.json();
            setCartItems(Array.isArray(result) ? result : []); // Safe fallback
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };



    const handleAddition = async (item) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tittle: item.tittle,
                    count: item.count + 1
                })
            });

            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const handleSubtraction = async (item) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tittle: item.tittle,
                    count: item.count - 1
                })
            });

            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true);

        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const handleDelete = async (item) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tittle: item.tittle,
                })
            });
            const result = await response.json();
            if (response.status === 401) {
                navigate('/login');
            }
            setFetching(true);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const calculateTotal = () => {
        const items = Array.isArray(cartItems) ? cartItems : []; // Ensure it's an array

        let subtotal = items.reduce((acc, item) => acc + item.prices * item.count, 0);
        const convenienceFee = 3;
        const gst = (subtotal * 0.02).toFixed(2);
        let totalPrice = (subtotal + convenienceFee + parseFloat(gst)).toFixed(2);
        let Discount = "0";

        if (subtotal >= 300) {
            Discount = '50₹';
            totalPrice = (totalPrice - 50).toFixed(2);
        }
        if (subtotal >= 500) {
            Discount = '100₹';
            totalPrice = (totalPrice - 100).toFixed(2);
        }
        if (subtotal >= 800) {
            Discount = '150₹';
            totalPrice = (totalPrice - 150).toFixed(2);
        }
        if (subtotal >= 1000) {
            Discount = "15%";
            totalPrice = (totalPrice * 0.85).toFixed(2);
        }

        return { subtotal, convenienceFee, gst, totalPrice, Discount };
    };

    const { subtotal, convenienceFee, gst, totalPrice, Discount } = calculateTotal();

    return (
        <div className={styles.container}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <img className={styles.images} src="/emptycart.png" alt="Empty Cart" />
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item._id} className={styles.cartItem}>
                            {/* Delete Button */}
                            <button className={styles.deleteBtn} onClick={() => handleDelete(item)}>🗑️</button>

                            {/* Left Image */}
                            <img src={item.img} alt={item.tittle} className={styles.image} />

                            {/* Details */}
                            <div className={styles.details}>
                                <h3 className={styles.title}>{item.tittle}</h3>
                                <p className={styles.calories}>{item.calories} kcal</p>
                            </div>

                            {/* Count and Actions */}
                            <div className={styles.actions}>
                                <button onClick={() => handleSubtraction(item)}>-</button>
                                <span>{item.count}</span>
                                <button onClick={() => handleAddition(item)}>+</button>
                            </div>
                        </div>
                    ))}

                    {/* Total Section */}
                    <div className={styles.totalSection}>
                        <div className={styles.totalRow}>
                            <span>Subtotal:</span>
                            <span>₹ {subtotal}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Convenience Fee:</span>
                            <span>₹ {convenienceFee}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>GST (2%):</span>
                            <span>₹ {gst}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Discount : </span>
                            <span>{`${Discount}`}</span>
                        </div>
                        <div className={styles.totalRow} style={{ fontWeight: 'bold', marginTop: '10px' }}>
                            <span>Total:</span>
                            <span>₹ {totalPrice}</span>
                        </div>
                    </div>
                    <Link to='/CheckOut'>
                        <button className={styles.checkout}>CheckOut</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default UnderComponent;

import { useState, useEffect } from 'react';
import styles from '../Component/CheckOut.module.css';
import { useNavigate } from 'react-router';

const CheckOut = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        paymentMethod: 'cash',
    });
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/practice/addcart', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            setCartItems(result);
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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.phoneNumber.length !== 10) {
            alert("Please provide a valid phone number");
            return;
        }

        if (formData.address.length < 10) { // Update with a proper address validation
            alert("Please provide a valid address");
            return;
        }

        if (parseFloat(totalPrice) <= 100) {
            alert("Please select any thing to order");
            return;
        }
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigate('/order/Pizza');
    };

    return (
        <div className={styles.container}>
            <h2>Go for Order</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

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
                        <span>Discount:</span>
                        <span>{Discount}</span>
                    </div>
                    <div className={styles.totalRow} style={{ fontWeight: 'bold', marginTop: '10px' }}>
                        <span>Total:</span>
                        <span>₹ {totalPrice}</span>
                    </div>
                </div>

                <div className={styles.paymentMethod}>
                    <label>Payment Method</label>
                    <div className={styles.paymentButtons}>
                        <button
                            type="button"
                            className={`${styles.paymentBtn} ${formData.paymentMethod === 'cash' ? styles.selected : ''}`}
                            onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                        >
                            Cash on Delivery
                        </button>
                        <button
                            type="button"
                            className={`${styles.paymentBtn} ${formData.paymentMethod === 'upi' ? styles.selected : ''}`}
                            onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        >
                            UPI/Google Pay
                        </button>
                    </div>
                </div>

                {formData.paymentMethod === "upi" && <img className={styles.images} src="/qrcode.jpeg" alt="" />}

                {/* Submit Button */}
                <button type="submit"
                    className={`${styles.submitBtn} ${parseFloat(totalPrice) <= 100 ? styles.blur : ''}`}
                    disabled={parseFloat(totalPrice) <= 100}
                >
                    Submit Order
                </button>
            </form>

            {/* Modal with Image and Cross Button */}
            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
                        <img className={styles.modalImage} src="/letseat.avif" alt="Confirmation" />
                        <p>Track your order using link provides in sms</p>
                        <p>fill free to contact us</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckOut;

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AddToCart from "./AddToCart";
import styles from "../Component/Order.module.css";

const Order = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <Navbar />
                <Outlet />
            </div>
            <div className={styles.rightSection}>
                <AddToCart />
            </div>
        </div>
    );
}

export default Order;

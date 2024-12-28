import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Component/Navbar.module.css"; // Import CSS module
import classNames from "classnames";
import { useCart } from "../context/CartContext";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for responsive toggle

const Navbar = () => {
    const [nav, setNav] = useState("Pizza");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
    const { user, setUser, getUserName } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser("/0");
        } else {
            getUserName();
        }
    }, [setUser]);

    const handleLogOut = () => {
        setUser("/0");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu visibility

    return (
        <div className={styles.fullcontainer}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="/pizzahut.png"
                            alt="Logo"
                            className={styles.logoImage}
                        />
                    </div>
                    <h2 className={styles.title}>Pizza Mania</h2>
                </div>

                {/* Login Button */}
                {user === "/0" ? (
                    <Link to="/login" className={styles.loginLink}>
                        <button className={styles.loginButton}>Login</button>
                    </Link>
                ) : (
                    <div className={styles.userContainer}>
                        <div>
                            <img
                                className={styles.userImage}
                                src="https://img.icons8.com/?size=100&id=23265&format=png&color=000000"
                                alt="User"
                            />
                            <span className={styles.userName}>{user}</span>
                        </div>
                        <button className={styles.logoutButton} onClick={handleLogOut}>
                            <img
                                className={styles.logoutIcon}
                                src="https://img.icons8.com/?size=100&id=2444&format=png&color=000000"
                                alt="Logout"
                            />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Hamburger Icon */}
            <div className={styles.menuToggle} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}


                {/* Navigation Section */}
                <div
                    className={classNames(styles.flexResponsive, {
                        [styles.showMenu]: isMenuOpen,
                    }
                    )}
                >
                    <Link to="/Order/Pizza" className={styles.link}>
                        <p
                            onClick={() => setNav("Pizza")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Pizza" })}
                        >
                            Pizza
                        </p>
                    </Link>
                    <Link to="/Order/Melts" className={styles.link}>
                        <p
                            onClick={() => setNav("Melts")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Melts" })}
                        >
                            Melts
                        </p>
                    </Link>
                    <Link to="/Order/Sides" className={styles.link}>
                        <p
                            onClick={() => setNav("Sides")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Sides" })}
                        >
                            Sides
                        </p>
                    </Link>
                    <Link to="/Order/Pastas" className={styles.link}>
                        <p
                            onClick={() => setNav("Pastas")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Pastas" })}
                        >
                            Pastas
                        </p>
                    </Link>
                    <Link to="/Order/Deserts" className={styles.link}>
                        <p
                            onClick={() => setNav("Deserts")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Deserts" })}
                        >
                            Deserts
                        </p>
                    </Link>
                    <Link to="/Order/Drinks" className={styles.link}>
                        <p
                            onClick={() => setNav("Drinks")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "Drinks" })}
                        >
                            Drinks
                        </p>
                    </Link>
                    <Link to="/Order/AddToCart" className={styles.link} >
                        <p
                            onClick={() => setNav("AddToCart")}
                            className={classNames(styles.navItem, { [styles.active]: nav === "AddToCart" })}
                        >
                            AddToCart
                        </p>
                    </Link>
                </div>
            </div>

            <div className={styles.container}>
                <Link to="/Order/Pizza" className={styles.link}>
                    <p
                        onClick={() => setNav("Pizza")}
                        className={`${styles.navItem} ${nav === "Pizza" ? styles.active : ""}`}
                    >
                        Pizza
                    </p>
                </Link>
                <Link to="/Order/Melts" className={styles.link}>
                    <p
                        onClick={() => setNav("Melts")}
                        className={`${styles.navItem} ${nav === "Melts" ? styles.active : ""}`}
                    >
                        Melts
                    </p>
                </Link>
                <Link to="/Order/Sides" className={styles.link}>
                    <p
                        onClick={() => setNav("Sides")}
                        className={`${styles.navItem} ${nav === "Sides" ? styles.active : ""}`}
                    >
                        Sides
                    </p>
                </Link>
                <Link to="/Order/Pastas" className={styles.link}>
                    <p
                        onClick={() => setNav("Pastas")}
                        className={`${styles.navItem} ${nav === "Pastas" ? styles.active : ""}`}
                    >
                        Pastas
                    </p>
                </Link>
                <Link to="/Order/Deserts" className={styles.link}>
                    <p
                        onClick={() => setNav("Deserts")}
                        className={`${styles.navItem} ${nav === "Deserts" ? styles.active : ""}`}
                    >
                        Deserts
                    </p>
                </Link>
                <Link to="/Order/Drinks" className={styles.link}>
                    <p
                        onClick={() => setNav("Drinks")}
                        className={`${styles.navItem} ${nav === "Drinks" ? styles.active : ""}`}
                    >
                        Drinks
                    </p>
                </Link>
                <Link to="/Order/AddToCart" className={styles.addcart}>
                    <p
                        onClick={() => setNav("AddToCart")}
                        className={`${styles.navItem} ${nav === "AddToCart" ? styles.active : ""}`}
                    >
                        AddToCart
                    </p>
                </Link>
            </div>

        </div>

    );
};

export default Navbar;

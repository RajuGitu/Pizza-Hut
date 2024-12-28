import { createContext, useState, useContext } from "react";

// Create the Cart Context
export const CartContext = createContext();

// Custom Hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext); // Access context values
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState("/0");

    const getUserName = async () => {
        try {
            // Retrieve token (Replace this with your method to get the token)
            const token = localStorage.getItem('token'); // Example: token stored in localStorage

            if (!token) {
                throw new Error('No authorization token found');
            }

            const response = await fetch('http://localhost:5000/practice/getauthenticate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                },
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch username');
            }

            const data = await response.json();

            // Handle the response
            setUser(data.userName); // Display username
        } catch (error) {
            console.log('Server side error:'); // Log error in case of failure
        }
    };
    

    return (
        <CartContext.Provider value={{ fetching, setFetching, user, setUser, getUserName }}>
            {children}
        </CartContext.Provider>
    );
};

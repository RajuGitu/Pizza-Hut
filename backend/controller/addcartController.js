const addcartModel = require("../models/addcartModel");

const addToCartController = async (req, res) => {
    try {
        const { tittle, prices, img, calories, menu, count } = req.body;

        // Validate input
        if (!tittle || !prices || !img || !calories || !menu) {
            return res.status(400).send({ message: "Fill all details" });
        }
        const validCount = parseInt(count, 10) || 1;
        // Check if item already exists in the cart
        const existingItem = await addcartModel.findOne({ tittle });

        if (existingItem) {
            // If the item already exists, update the count
            existingItem.count += validCount; // Increment count by the value sent
            await existingItem.save(); // Save the updated item
            return res.status(200).send({ message: "Item count updated in cart" });
        }

        // If the item doesn't exist, create a new cart item
        await addcartModel.create({ tittle, prices, img, calories, menu, count });
        return res.status(200).send({ message: "Item added to cart successfully" });

    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).send({ message: "Server side error" });
    }
};


const getAllCartController = async (req, res) => {
    try {
        const users = await addcartModel.find({});
        if (!users) {
            return res.status(401).send({ message: "Your Cart is Empty" });
        }
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: "Server Side Problem" });
    }
}
const updateAddititonSubtractController = async (req, res) => {
    try {
        const { tittle, count } = req.body;

        // Find the item in the cart
        const user = await addcartModel.findOne({ tittle });

        // If the item is not found, return an error
        if (!user) {
            return res.status(404).send({ message: "Item not found in cart" });
        }

        // Update the count if it's greater than 0
        if (count > 0) {
            user.count = count;
            await user.save();
            return res.status(200).send({ message: "Updated the food count" });
        } else {
            // If count is less than or equal to 0, delete the item
            await addcartModel.deleteOne({ tittle });
            return res.status(200).send({ message: "Removed the food from cart" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Server Side Problem" });
    }
}


const deleteCartController = async (req, res) => {
    try {
        const { tittle } = req.body;
        const user = await addcartModel.findOne({ tittle });
        if (!user) {
            return res.status(200).send({ message: "No user" });
        }
        await addcartModel.deleteOne({ tittle });
        return res.status(200).send({ message: "Deleted the food item" });

    } catch (error) {
        return res.status(500).send({ message: "Server Side Problem" });
    }
}

module.exports = {
    addToCartController,
    getAllCartController,
    updateAddititonSubtractController,
    deleteCartController
}
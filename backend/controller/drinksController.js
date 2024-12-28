const drinksModel = require("../models/drinksModel");

const createDrinksController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all detail" });
        }
        const user = await drinksModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "User is Created" });
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
}

const getAllDrinksController = async (req, res) => {
    try {
        const users = await drinksModel.find({});
        if (!users) {
            return res.status(401).send({ message: "not any drinks beverage" });
        }
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
}

module.exports = {
    createDrinksController,
    getAllDrinksController
}
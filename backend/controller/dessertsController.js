const dessertsModel = require("../models/dessertsModel");

const createDessertsController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all details" });
        }
        const dessert = await dessertsModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "Dessert is Created" });
    } catch (error) {
        return res.status(500).send({ message: "Server-side Problem" });
    }
}

const getAllDessertsController = async (req, res) => {
    try {
        const desserts = await dessertsModel.find({});
        if (!desserts.length) {
            return res.status(401).send({ message: "No desserts available" });
        }
        return res.status(200).send(desserts);
    } catch (error) {
        return res.status(500).send({ message: "Server-side Problem" });
    }
}

module.exports = {
    createDessertsController,
    getAllDessertsController
}

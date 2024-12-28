const sidesModel = require("../models/sidesModel");

const createSidesController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all detail" });
        }
        const side = await sidesModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "Side is Created" });
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
};

const getAllSidesController = async (req, res) => {
    try {
        const sides = await sidesModel.find({});
        if (!sides) {
            return res.status(401).send({ message: "No sides found" });
        }
        return res.status(200).send(sides);
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
};

module.exports = {
    createSidesController,
    getAllSidesController
};

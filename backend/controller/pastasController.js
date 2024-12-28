const pastasModel = require("../models/pastasModel");

const createPastasController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all detail" });
        }
        const pasta = await pastasModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "Pasta is Created" });
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
};

const getAllPastasController = async (req, res) => {
    try {
        const pastas = await pastasModel.find({});
        if (!pastas) {
            return res.status(401).send({ message: "No pastas found" });
        }
        return res.status(200).send(pastas);
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
};

module.exports = {
    createPastasController,
    getAllPastasController
};

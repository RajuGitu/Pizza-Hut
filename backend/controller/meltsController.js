const meltsModel = require("../models/meltsModel");

const createMeltsController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all details" });
        }
        const melt = await meltsModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "Melt is Created" });
    } catch (error) {
        return res.status(500).send({ message: "Server-side Problem" });
    }
}

const getAllMeltsController = async (req, res) => {
    try {
        const melts = await meltsModel.find({});
        if (!melts.length) {
            return res.status(401).send({ message: "No melts available" });
        }
        return res.status(200).send(melts);
    } catch (error) {
        return res.status(500).send({ message: "Server-side Problem" });
    }
}

module.exports = {
    createMeltsController,
    getAllMeltsController
}

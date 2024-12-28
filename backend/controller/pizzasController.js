const pizzasModel = require("../models/pizzasModel");

const pizzasCreateController = async (req, res) => {
    try {
        const { img, tittle, calories, description, prices, menu } = req.body;
        if (!img || !tittle || !calories || !description || !prices || !menu) {
            return res.status(401).send({ message: "Fill all detail" });
        }
        const user = await pizzasModel.create({ img, tittle, calories, description, prices, menu });
        return res.status(200).send({ message: "User is Created" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server side Problem", error });
    }
}


const getAllPizzasController = async (req, res) => {
    try {
        const users = await pizzasModel.find({});
        if (!users) {
            return res.status(401).send({ message: "not any drinks beverage" });
        }
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: "Server side Problem" });
    }
}


module.exports = {
    pizzasCreateController,
    getAllPizzasController
}
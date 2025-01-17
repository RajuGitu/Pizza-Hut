const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const connectDb = require('./config/db');

dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/practice', require('./routes/userRoutes'));
app.use('/practice', require('./routes/drinksRoute'));
app.use('/practice', require('./routes/pizzasRoute'));
app.use('/practice', require('./routes/addcartRoute'));
app.use('/practice', require('./routes/meltsRoute'));
app.use('/practice', require('./routes/dessertsRoute'));
app.use('/practice', require('./routes/sidesRoute'));
app.use('/practice', require('./routes/pastasRoute'));

app.listen(PORT, (req, res) => {
    console.log("Server is Running");
})
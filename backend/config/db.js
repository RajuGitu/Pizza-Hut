const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is Connected to ${mongoose.connection.host}`);
    } catch (error) {
        console.log("Database is not connected");
    }
}


module.exports = connectDb;
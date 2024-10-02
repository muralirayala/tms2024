// dbConfig.js
const mongoose = require('mongoose');
const User = require('../../user-service/models/userModel');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        console.log('MongoDB URI:', uri);

        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        // Check if MongoDB is already connected
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB is already connected');
            return;
        }

        // If not connected, attempt to connect
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');        
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        console.error('Detailed error:', err); // Log more detailed error information
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

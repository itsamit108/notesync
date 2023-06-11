const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://itsamit108:YoQwgheThIls9jaG@cluster0.yknaszp.mongodb.net/?retryWrites=true&w=majority';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

module.exports = connectToMongo;

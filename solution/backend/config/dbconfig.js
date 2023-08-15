const mongoose = require('mongoose');

// Function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://tapDBUser:TapDBUserPwd@clustertapdb.sycodi5.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

module.exports = connectDB;
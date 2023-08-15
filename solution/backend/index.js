const express = require("express");
const passport = require('passport');
const app = express();
const PORT = 3000;
const connectDB = require("./config/dbconfig");
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require("./routes/authRoutes")

// Connect to the MongoDB database
connectDB();

app.get('/', (req, res) => {
  res.send('At last, yeah this is our server!');
});
   
app.use(cors({
//   origin: "http://127.0.0.1:5173" || "http://localhost:5173" 
  origin: "*" 
}));

// Body parser middleware
app.use(express.json());

// Parse incoming JSON request bodies
app.use(bodyParser.json());
// Initialize Passport and use it as middleware
app.use(passport.initialize());

// Include the user routes
// app.use('/train', trainRoutes);
app.use('/train', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
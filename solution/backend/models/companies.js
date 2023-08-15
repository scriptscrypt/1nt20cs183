const mongoose = require('mongoose');

// Define the User schema
const companiesSchema = new mongoose.Schema({

  companyName: {
    type: String, 
    required: true,
  },
  clientID: {
    type: String,
    required: true,
    unique: [true, "Cannot be blank"]
  },
  clientSecret: {
    type: String,
    required: true,
    unique: [true, "Cannot be blank"]
  },
  ownerName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String, 
    required: [true, "Cannot be blank"]
  },
  ownerEmail:{
    type: String, 
    default: 0
  },
  accessCode:{
    type: String,
  },
  createdAt:{
    type: Date,
    default : Date.now(),
    required: true
  },
});
 
// Create the User model
const Company = mongoose.model('collTrainCompanies', companiesSchema);

module.exports = Company;
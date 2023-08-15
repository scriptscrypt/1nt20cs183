const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const Company = require('../models/companies'); 

function generateRandomAlphanumeric(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// User Registration
router.post('/register', async (req, res) => {
  // console.log(req.body);
  
  const { 
    ipCompanyName,
    ipOwnerName,
    ipRollNo,
    ipOwnerEmail,
    ipAccessCode 
    
  } = req.body;

  console.log("Register route started");
  try {
    // Check if the user already exists
    const existingUser = await Company.findOne({ ipOwnerEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    } else {

      // Create a new user with the hashed password
      const newCompany = new Company({
        companyName: ipCompanyName,
        clientID: `${generateRandomAlphanumeric(8)}-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(12)}`,
        clientSecret: `${generateRandomAlphanumeric(16)}`,
        ownerName: ipOwnerName,
        rollNo: ipRollNo,
        ownerEmail: ipOwnerEmail,
        accessCode: ipAccessCode,
      });

      await newCompany.save();
      
      // console.log(username, hashedPassword);
      res.status(201).json(
        newCompany
      );
      return res;
    } 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

  console.log("Register route ended");
});

// Company login
router.post('/auth', async (req, res) => {

  const { 
    ipCompanyName,
    ipClientId,
    ipClientSecret,
    ipOwnerName,
    ipOwnerEmail,
    ipRollNo,
  
  } = req.body;

  try {
    // Check if the user exists
    const company = await Company.findOne({ ownerEmail: ipOwnerEmail });
    console.log(  
      ipCompanyName,
      ipClientId,
      ipClientSecret,
      ipOwnerName,
      ipOwnerEmail,
      ipRollNo
      )
    if (!company) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ sub: company._id }, "secretKeyIsThis", { expiresIn: '4d' });
    // localStorage.setItem("bearertoken", token); 
    opJson = {
      token_type :"Bearer",
      access_token: token,
      expires_in: "4d"
    }
    res.status(200).json(opJson);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
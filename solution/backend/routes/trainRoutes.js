const express = require('express');
const router = express.Router();
const Train = require('../models/trains'); 

router.get('/trains', async (req, res) => {
  try {
    const allTrains = await Train.find();
    console.log(allTrains)
    res.status(200).json(allTrains);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get details of a specific train by trainNumber
router.get('/trains/:trainNumber', async (req, res) => {
  const { trainNumber } = req.params;

  try {
    const trainDetails = await Train.findOne({ trainNumber: `${trainNumber}` });
    
    if (!trainDetails) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.status(200).json(trainDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

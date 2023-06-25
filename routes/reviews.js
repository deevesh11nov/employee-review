const express = require('express'); // requiring the express
const router = express.Router(); // routere
// requring the reviewController file 
const reviewController = require('../controllers/review_controller');

// setting up the new review
router.get('/newReview/:id' , reviewController.newReview);

module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('customer'), [
  body('menuItem').isMongoId().withMessage('Valid menu item ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
  body('order').isMongoId().withMessage('Valid order ID is required')
], reviewController.createReview);

router.get('/menuItem/:menuItemId', reviewController.getReviewsForMenuItem);

module.exports = router;
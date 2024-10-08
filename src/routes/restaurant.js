const express = require('express');
const { body } = require('express-validator');
const restaurantController = require('../controllers/restaurantController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('restaurant_owner', 'admin'), [
  body('name').notEmpty().withMessage('Restaurant name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('cuisine').isArray().withMessage('Cuisine must be an array of strings'),
  body('openingHours').notEmpty().withMessage('Opening hours are required')
], restaurantController.createRestaurant);

router.get('/', restaurantController.getAllRestaurants);
router.get('/nearby', restaurantController.getNearbyRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.put('/:id', protect, authorize('restaurant_owner', 'restaurant_manager', 'admin'), restaurantController.updateRestaurant);
router.delete('/:id', protect, authorize('restaurant_owner', 'admin'), restaurantController.deleteRestaurant);

module.exports = router;
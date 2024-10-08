const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty')
], userController.updateProfile);

router.get('/favorites', protect, authorize('customer'), userController.getFavorites);
router.post('/favorites/:menuItemId', protect, authorize('customer'), userController.addFavorite);
router.delete('/favorites/:menuItemId', protect, authorize('customer'), userController.removeFavorite);

module.exports = router;
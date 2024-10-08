const express = require('express');
const { body } = require('express-validator');
const menuController = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('restaurant_owner', 'restaurant_manager'), [
  body('name').notEmpty().withMessage('Item name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('restaurant').isMongoId().withMessage('Valid restaurant ID is required'),
  body('category').notEmpty().withMessage('Category is required')
], menuController.createMenuItem);

router.get('/restaurant/:restaurantId', menuController.getMenuByRestaurant);
router.get('/popular', menuController.getPopularItems);
router.get('/:id', menuController.getMenuItem);
router.put('/:id', protect, authorize('restaurant_owner', 'restaurant_manager'), menuController.updateMenuItem);
router.delete('/:id', protect, authorize('restaurant_owner', 'restaurant_manager'), menuController.deleteMenuItem);

module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('customer'), [
  body('restaurant').isMongoId().withMessage('Valid restaurant ID is required'),
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.menuItem').isMongoId().withMessage('Valid menu item ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('deliveryAddress').notEmpty().withMessage('Delivery address is required')
], orderController.createOrder);

router.get('/customer', protect, authorize('customer'), orderController.getCustomerOrders);
router.get('/restaurant', protect, authorize('restaurant_owner', 'restaurant_manager'), orderController.getRestaurantOrders);
router.get('/driver', protect, authorize('delivery_driver'), orderController.getDriverOrders);
router.get('/:id', protect, orderController.getOrder);
router.put('/:id/status', protect, authorize('restaurant_owner', 'restaurant_manager', 'delivery_driver'), orderController.updateOrderStatus);

module.exports = router;
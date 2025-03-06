const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.findAll);
router.get('/:id', orderController.findOne);
router.get('/user/:userId', orderController.findByUser);
router.post('/', orderController.create);
router.put('/:id/status', orderController.updateStatus);

module.exports = router;

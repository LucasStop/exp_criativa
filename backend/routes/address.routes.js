const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');

router.get('/', addressController.findAll);
router.get('/:id', addressController.findOne);
router.get('/user/:userId', addressController.findByUser);
router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.delete('/:id', addressController.delete);

module.exports = router;

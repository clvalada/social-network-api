// usersRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

// Add more routes as needed

module.exports = router;

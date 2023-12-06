const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/ThoughtController');

// Define thought routes
router.get('/thoughts', ThoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', ThoughtController.getThoughtById);
router.post('/thoughts', ThoughtController.createThought);
router.put('/thoughts/:thoughtId', ThoughtController.updateThought);
router.delete('/thoughts/:thoughtId', ThoughtController.deleteThought);

module.exports = router;

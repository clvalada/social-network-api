// routes/thoughtsRoutes.js

const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/ThoughtController');

router.get('/thoughts', ThoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', ThoughtController.getThoughtById);
router.post('/thoughts', ThoughtController.createThought);
router.put('/thoughts/:thoughtId', ThoughtController.updateThought);
router.delete('/thoughts/:thoughtId', ThoughtController.deleteThought);
router.post('/thoughts/:thoughtId/reactions', ThoughtController.createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', ThoughtController.removeReaction);

module.exports = router;


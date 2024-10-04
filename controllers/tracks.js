const express = require('express');
const router = express.Router();
const Track = require('../models/Track');  

// POST a new track
router.post('/', async (req, res) => {
    try {
      const track = new Track({
        title: req.body.title,
        artist: req.body.artist,
      });
      await track.save();
      res.status(201).send(track);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error', message: error.message });
    }
});

// GET all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.send(tracks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET a single track by ID
router.get('/:id', async (req, res) => {
    try {
      const track = await Track.findById(req.params.id);
      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }
      res.send(track);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

// PUT update a track by ID
router.put('/:id', async (req, res) => {
    try {
      const track = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }
      res.send(track);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});

// DELETE a track by ID
router.delete('/:id', async (req, res) => {
    try {
      const track = await Track.findByIdAndDelete(req.params.id);
      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }
      res.send(track);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});
  
module.exports = router;

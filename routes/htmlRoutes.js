const router = require('express').Router();
const path = require('path');

// GET /notes - Serve notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET * - Serve index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
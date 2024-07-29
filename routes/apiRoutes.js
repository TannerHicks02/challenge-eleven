const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../db/db.json');

// Helper function to read the JSON file
const readNotes = () => {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

// Helper function to write to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
};

// GET /api/notes - Retrieve all notes
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST /api/notes - Save a new note
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { id: uuidv4(), ...req.body };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// DELETE /api/notes/:id - Delete a note
router.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const filteredNotes = notes.filter(note => note.id !== req.params.id);
  writeNotes(filteredNotes);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
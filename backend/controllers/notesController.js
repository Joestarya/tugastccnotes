const NoteModel = require('../models/notesModel.js');

exports.getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.getAll();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createNote = async (req, res) => {
    try {
        await NoteModel.create(req.body);
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateNote = async (req, res) => {
    try {
        const updated = await NoteModel.updateById(req.params.id, req.body);
        if (updated[0] === 0) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const deleted = await NoteModel.deleteById(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

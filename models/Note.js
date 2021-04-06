const mongoose =require("mongoose");

const NoteSchema = {
  key: Number,
  title: String,
  content: String,
};
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note
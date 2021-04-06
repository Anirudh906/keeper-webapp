const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(bodyParser.json());
//app.use(express.static("public"));
const URL = process.env.MONGO_URL;

mongoose
  .connect(
    URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

const notes = require("../api/notes");
app.use("/api/notes", notes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//-----------------------------------------------------------------------------------------------------------



// const NoteSchema = {
//   key: Number,
//   title: String,
//   content: String,
// };
// const Note = mongoose.model("Note", NoteSchema);

// app.get("/", (req, res) => {
//   Note.find({}, function (err, foundItems) {
//     if (!err) {
//       res.json(foundItems);
//     } else console.log(err);
//   });
// });

// app.post("/", (req, res) => {
//   const { title, content } = req.body;
//   console.log(req.body);
//   const newNote = new Note({
//     title: title,
//     content: content,
//   });
//   newNote.save();
// });

// app.post("/del", (req, res) => {
//   var id = req.body.id;
//   //console.log(req.body);
//   Note.find({}, function (err, foundItems) {
//     if (!err) {
//       const obId = foundItems[id]._id;

//       Note.findByIdAndDelete(obId, function (err) {
//         if (!err) {
//           console.log("Successfully deleted checked item.");
//         }
//       });
//     } else console.log(err);
//   });
// });

// ------------------------------------------------------------------------------------------------------
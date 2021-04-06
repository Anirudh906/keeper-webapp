const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

router.get("/", (req, res) => {
    Note.find({}, function (err, foundItems) {
        if (!err) {
            res.json(foundItems);
        } else console.log(err);
    });
});

router.post("/", (req, res) => {
    const {
        title,
        content
    } = req.body;
    //console.log(req.body);
    const newNote = new Note({
        title: title,
        content: content,
    });
    newNote.save();
});

router.post("/del", (req, res) => {
    var id = req.body.id;
    //console.log(req.body);
    Note.find({}, function (err, foundItems) {
        if (!err) {
            const obId = foundItems[id]._id;

            Note.findByIdAndDelete(obId, function (err) {
                if (!err) {
                    console.log("Successfully deleted checked item.");
                }
            });
        } else console.log(err);
    });
});
module.exports = router
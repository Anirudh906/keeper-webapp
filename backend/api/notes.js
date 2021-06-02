const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Data = require("../models/model");
const Note = Data.Note;

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        // res.send("Please login first !!");
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err){
                // res.json({auth:false, message:"U failed to authenticate"});
            }else{
                req.body.userID = decoded.id;
                next();
            }
        });
    }
};



router.get("/",verifyJWT, (req, res) => {
    const { userID }= req.body;
   // console.log(req);
    Note.find({userID: userID}, function (err, foundItems) {
        if (!err) {
            res.json(foundItems);
        } else console.log(err);
    });
});

router.post("/",verifyJWT, (req, res) => {
    const {
        title,
        content, 
        userID
    } = req.body;
    console.log(req.body);
    const newNote = new Note({
        title: title,
        content: content,
        userID: userID
    });
    newNote.save();
});

router.post("/del", verifyJWT, (req, res) => {
    var id = req.body.id;
    var uID = req.body.userID;
    //console.log(req.body);
    Note.find({userID: uID}, function (err, foundItems) {
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

const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds=10;
const jwt = require('jsonwebtoken');

const Data = require("../models/model");
const User = Data.User;


router.post("/signup", async (req, res) => {
   const { username, fullname, password, contact }= req.body;
   

bcrypt.hash(password, saltRounds, (err, hash) => {
if(err){
   console.log(err);
   res.send({reg: false, message:"Error occured! Please try again"})
  }
try{
   const newUser = new User({
       username: username,
       fullname : fullname,
       password : hash,
       contact : contact
   });
    newUser.save((err, result) => {
      if(err){
        //console.log(err.errors);
        res.send({reg: false, message:"Error occured! Please try again"});
      }
      else{
        res.send({reg : true, message:"Successfully registered"});
      }
    });
  
   //res.send({reg : true, message:"Successfully registered"});
}
catch (e){
   //handleErrors(err);
  res.status(400).send({reg:false, message:'User not created'});
}
   
  });
});


router.post("/login", (req, res) => {
  const { username, password }= req.body;
  console.log(req.body);
   User.find({username:username}, function (err, foundItems){
     if(err){
       res.send({err:err});
     }
     if(foundItems.length > 0){
       bcrypt.compare(password, foundItems[0].password, (err, response) =>{
         if(err){console.log(err);}
         if(response){
           //res.send({message: "Authenticated"});

          const id = foundItems[0]._id;
          const token= jwt.sign({id}, "jwtSecret", {
            expiresIn: 3000,
          }) 
          res.json({auth:true, token: token}); 

          //  console.log(foundItems);
         }else{
           res.send({auth:false, message: "Wrong username/password combination"});
           console.log("Wrong username/password combination");
          }
       
     });
     }
     else {
      res.send({ auth: false, message: "User doesn't exist" });
       console.log({message: "User doesn't exist"});
     }

  });
});
 module.exports = router
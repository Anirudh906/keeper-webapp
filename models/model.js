const mongoose =require("mongoose");
//const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true,'Please enter Email'], unique:true },
  fullname: { type: String, required: [true, 'Please enter fullname'] },
  password: { type: String, required: [true, 'Please enter password'] , minlength: [8 , 'Minimum 8 characters required']},
  contact: { type: Number, required: [true, 'Please enter contact']},
});

const NoteSchema = new mongoose.Schema({
  title: String ,
  content: String ,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true }
});


// UserSchema.pre('save',async function(next){
//  const salt= await bcrypt.genSalt();
//  this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", UserSchema);
const Note = mongoose.model("Note", NoteSchema);
module.exports.Note = Note
module.exports.User= User
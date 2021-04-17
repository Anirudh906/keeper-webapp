import React, { useState } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function SignUp() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [fullname, setFullname] = useState("");
   const [contact, setContact] = useState("");
   const [registered, setRegistered]=useState(false);
   const [Messg, setMessg]= useState("");
const register = () => {
  if(password.length < 8 && username && fullname && contact){
    setMessg("Password must be 8 characters long");
    return;
  }

  setUsername("");
  setPassword("");
  setFullname("");
  setContact("");

  
  axios.post("/api/Auth/signup", {
    username: username,
    fullname: fullname,
    password: password,
    contact: contact
  }).then((response) => {
    console.log(response);
    setRegistered(response.data.reg);
    setMessg(response.data.message);
  });
  //setRegistered(true);
};
 if(registered){
   return(<Redirect to="/login" />);
 }
 return (
   <div className="container">
     <PersonAddIcon style={{ fontSize: "3rem" }} />
     <h1>Signup</h1>

     <br></br>
     <form>
       <input
         name="fullName"
         autoComplete="off"
         onChange={(e) => {
           setFullname(e.target.value);
         }}
         placeholder="Full Name"
         value={fullname}
         
       />
       <input
         name="username"
         placeholder="username"
         autoComplete="off"
         onChange={(e) => {
           setUsername(e.target.value);
         }}
         value={username}
         required
       />
       <input
         name="password"
         placeholder="password - 8 characters"
         type="password"
         autoComplete="off"
         onChange={(e) => {
           setPassword(e.target.value);
         }}
         value={password}
         required
       />
       <input
         name="contact"
         placeholder="contact"
         autoComplete="off"
         onChange={(e) => {
           setContact(e.target.value);
         }}
         value={contact}
         required
       />
       <br></br>
       {Messg}
       <br></br>
       <br></br>
       <Button
         onClick={register}
         variant="outlined"
         color="primary"
         size="large"
       >
         Register
       </Button>
     </form>
   </div>
 );
}
export default SignUp;

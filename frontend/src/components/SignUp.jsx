import React, { useState } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [registered, setRegistered]=useState(false);
  const [Messg, setMessg]= useState("");
  const register = () => {
    if(username === "" || password === "" || fullname === "" || contact === "") { setMessg("Please enter all details"); return;}
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
     <div style={{position:"absolute", top:"15px", left:"15px"}}><Button  component={Link} to = "/"> <KeyboardBackspaceIcon />&nbsp;Back</Button>
     </div>
  <div class="box">
  <h2>SignUp</h2>
     <form>
       <div class="inputBox">
         <label for="userName">Fullname</label>
         <input
           name="fullName"
           autoComplete="off"
           onChange={(e) => {
             setFullname(e.target.value);
           }}
           placeholder="Full Name"
           value={fullname}
         />
       </div>
       <div class="inputBox">
         <label for="userName">Username</label>
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
       </div>
       <div class="inputBox">
         <label for="userName">Password</label>
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
       </div>
       <div class="inputBox">
         <label for="userName">UserName</label>
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
       </div>
       <br></br>
      <h5 style={{color:"yellow"}}>{Messg}</h5>
       <br></br>
       <br></br>
       <Button
         onClick={register}
         variant="outlined"
         
         size="large"
       >
         Register
       </Button>
       
     </form>
     </div>
   </div>
 );
}
export default SignUp;

// eslint-disable-next-line
import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState(false);
  const [LoginM, setLoginM]=useState("");

  const login = (e) => {
    e.preventDefault();
    if (username === "" && password != "") {
      setLoginM("Please enter username"); 
      setPassword("");
      setUsername("");
      return;
    }
    else if (password === "" && username != "") {
      setLoginM("Please enter password"); 
      setPassword("");
      setUsername("");
      return;
    }
    else if (username === "" && password === "") {
      setLoginM("Please enter username and password"); 
      setPassword("");
      setUsername("");
      return;
    }
    setPassword("");
    setUsername("");


    axios
      .post("/api/Auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if(response.data.auth){
        console.log(response.data.token); 
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        }
        else {
          setLoginM(response.data.message);
          setLoginStatus(false);
         // console.log(LoginStatus);
        }
      });
    };
  if(LoginStatus){
    return (<Redirect to="/notes" />)
  }
  
  return (
    <div className="container">
      <div style={{position:"absolute", top:"15px", left:"15px"}}><Button component={Link} to="/"> <KeyboardBackspaceIcon />&nbsp;Back</Button></div>
      <br></br>
    
      <div class="box">
        <h2>Login</h2>
        <form>
          <div class="inputBox">
            <label for="userName">Username</label>
            <input
              name="username"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              value={username}
              
            />
          </div>
          <div class="inputBox">
            <label for="userPassword">Password</label>
            <input
              name="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              type="password"
              value={password}
            
            />
          </div>
          <h4 style={{ color: "red" }}>{LoginM}</h4>
          <br></br>
          <Button
            onClick={login}
            variant="outlined"
            
            size="large"
          >
            Login
          </Button>
          <h5>
            <br/>
            Don't have an account? <a href="/signup">Signup</a>
          </h5>
        </form>
      </div>
    </div>
  );
}
export default Login;

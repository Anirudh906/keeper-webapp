// eslint-disable-next-line
import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState(false);
  const [LoginM, setLoginM]=useState("");

  const login = (e) => {
    e.preventDefault();
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
      <AccountBoxIcon style={{ fontSize: "3rem" }} /> <h1>Login</h1>
      <br></br>
      <form>
        <input
          name="username"
          autoComplete="off"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          value={username}
        />
        <input
          name="password"
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Passoword"
          type="password"
          value={password}
          autoComplete="on"
        />
      
        <h4 style={{ color: "red" }}>{LoginM}</h4>
        <br></br>
        <Button onClick={login} variant="outlined" color="primary" size="large">
          Login
        </Button>
       
        <br></br>
        <br></br>
        <h5>
          {" "}
          Don't have an account? <a href="/signup">Signup</a>
        </h5>
      </form>
      {/* // {LoginStatus && <Redirect to ="/notes" />} */}
    </div>
  );
}
export default Login;

import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
//import notes from "../notes.js";

import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import Welcome from "./Welcome.jsx";
import Notes from "./NotesD.jsx";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />{" "}
        </Route>
        <Route path="/notes">
          <Notes />
         
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;

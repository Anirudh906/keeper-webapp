import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import axios from "axios";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//import notes from "../notes.js";
import CreateArea from "./CreateArea.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import Welcome from "./Welcome.jsx";

function App() {
 
  const [notes, setNotes] = useState([]);

  //const getData = () => fetch("/api/notes").then((res) => res.json());
   //getData().then((notes) => setNotes(notes));
 useEffect(() => {
     axios
    		.get("/api/notes", {
          headers: {
            "x-access-token":localStorage.getItem("token")
          }
        })
    		.then((res) => {setNotes(res.data); })
    		.catch((err) => console.log(err));
    
  }, []);

  
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    axios
      .post("/api/notes", 
        {
        title: newNote.title,
        content: newNote.content
        },{
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(function () {
        console.log("Note created successfully");
        //window.location.reload();
      })
      .catch(function () {
        console.log("Could not creat note. Please try again");
      });
  }

  function deleteNote(id, title, content) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios
      .post(
        "/api/notes/del",
        {
          id: id,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then(function () {
        console.log("Deleted successfully");
      })
      .catch(function () {
        console.log("could not delete. Please try again");
      });
  }

  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" exact><Welcome /></Route>
    <Route path="/signup"><SignUp /></Route>
    <Route path="/login"><Login /> </Route>
    <Route path="/notes">
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
    </Route>
    
    </Switch>
    </BrowserRouter>
  );
}
export default App;

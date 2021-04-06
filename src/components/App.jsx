import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import axios from "axios";
//import notes from "../notes.js";
import CreateArea from "./CreateArea.jsx";

function App() {
  const [notes, setNotes] = useState([]);

  const getData = () => fetch("/api/notes").then((res) => res.json());
  useEffect(() => {
    getData().then((notes) => setNotes(notes));
  }, []);

  //------------------------------------------------------------
  //  axios
  // 		.get("http://localhost:5000/")
  // 		.then((res) => console.log(res))
  // 		.catch((err) => console.log(err));
  // }
  //------------------------------------------------------------

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    axios
      .post("/api/notes", {
        title: newNote.title,
        content: newNote.content,
      })
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
      .post("/api/notes/del", {
        id: id,
      })
      .then(function () {
        console.log("Deleted successfully");
      })
      .catch(function () {
        console.log("could not delete. Please try again");
      });
  }

  return (
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
  );
}
export default App;

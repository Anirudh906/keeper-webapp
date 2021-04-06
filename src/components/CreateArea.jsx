import React, { useState } from "react";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setExpanded] = useState(false);
  const [isShadow, setShadow] = useState(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (note.title === "" && note.content === "") {
      event.preventDefault();
      return;
    }
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
  function expand() {
    setExpanded(true);
  }
  function shadowIn() {
    setShadow(true);
  }
  function shadowOut() {
    setShadow(false);
  }
  var shadowStyles = { boxShadow: "0 1px 5px rgb(138, 137, 137)" };
  return (
    <div>
      <form
        className="create-note"
        onMouseOver={shadowIn}
        onMouseOut={shadowOut}
        style={isShadow ? shadowStyles : null}
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="off"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          autoComplete="off"
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <NoteAddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

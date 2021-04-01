import React , { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
 
function Note(props){
  const [isShadow, setShadow]=useState(false);  
  var ShadowSt = { boxShadow: "0 2px 5px rgb(138, 137, 137)" }
   function shadowIn(){
     setShadow(true);
     }
  function shadowOut(){
    setShadow(false);
  }   
return (
    <div className="note" onMouseOver= {shadowIn} onMouseOut= {shadowOut} style={isShadow ? ShadowSt : null} >
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={()=> props.onDelete(props.id)}><DeleteIcon /></button>
    </div>
 )
}
export default Note;
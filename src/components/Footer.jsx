import React , { useState }from "react";

function Footer(){
const[bold, setBold]=useState(false);
var boldSt = {fontWeight:"bold",color:"black"}


return (<footer> <p onMouseOver={() => {setBold(true)}} onMouseOut={() => {setBold(false)}} style={bold ? boldSt : null} >Copyright © {new Date().getFullYear()}. Made by Anirudh S.</p></footer>);
}
export default Footer;
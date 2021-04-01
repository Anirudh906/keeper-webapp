import React from "react";
import Zoom from '@material-ui/core/Zoom';
function Header(){
    return (<header><Zoom in={true}><i className="far fa-lightbulb shimmer" ></i></Zoom><h1>Keeper</h1></header>);  
}
export default Header;
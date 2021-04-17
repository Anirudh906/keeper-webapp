import React from "react";
import Zoom from '@material-ui/core/Zoom';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
function Header(){
    return (
      <header>
        <Zoom in={true}>
          <i className="far fa-lightbulb shimmer"></i>
        </Zoom>
        <h1>Keeper</h1>
        <Button
          style={{ position: "absolute", right: "30px", fontWeight: "bold" }}
          size="large"
          component={Link}
          to="/"
        >
        <ExitToAppIcon
        />
          Logout
        </Button>
        
      </header>
    );  
}
export default Header;
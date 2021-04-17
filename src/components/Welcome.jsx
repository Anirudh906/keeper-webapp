import React from "react";
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


function Welcome(){
    return (
      <div className="welcomediv">
        <div className="main">
          <Zoom in={true}>
            <i className="far fa-lightbulb shimmer welcomei"></i>
          </Zoom>
          &nbsp;<h1>Keeper App</h1>
          <br></br>
        </div>
        <h3 className="main-h3"> One place to keep all your notes !</h3>
        <br></br>
        <br></br>
        <div>
          <Button
            component={Link}
            variant="outlined"
            color="secondary"
            size="large"
            to="/Signup"
          >
            Signup{" "}
          </Button>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to="/Login"
          >
            Login{" "}
          </Button>
        </div>
      </div>
    );
};
export default Welcome;
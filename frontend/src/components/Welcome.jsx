import React, { useState, useEffect, useRef } from "react";
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import Particles from "react-tsparticles";
import LightBulb from "./LightBulb";
import Reveal from "react-reveal";
import FOG from "vanta/dist/vanta.fog.min";
import Footer from "./Footer";
function Welcome(){
   const [vantaEffect, setVantaEffect] = useState(0);
   const myRef = useRef(null);
   useEffect(() => {
     if (!vantaEffect) {
       setVantaEffect(
         FOG({
           el: myRef.current,
           midtoneColor: 0xf49687,
           lowlightColor: 0xe3dfff,
           baseColor: 0xf2f185,
         })
       );
     }
     return () => {
       if (vantaEffect) vantaEffect.destroy();
     };
   }, [vantaEffect]);
   return (
     <div ref={myRef} className="main-div">
     <Container fluid>
      <Row>
      <Reveal delay="1000">
       <div >
        
       
         <div className="light-bulb-main">
          <LightBulb />
         </div>  
      
       


         <div className = "main">
           
           &nbsp;<h1>Keeper App</h1>
           <br></br>
         
         <h3 className="main-h3"> One place to keep all your notes !</h3>
         <br></br>
         <br></br>
         <div className="btn-main">
           <Button
             component={Link}
             variant="outlined"
             color="secondary"
             size="large"
             to="/Signup"
           >
             Signup{" "}
           </Button>
           &nbsp; &nbsp; &nbsp; &nbsp;
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
         <Footer />
      
       </div>
       </Reveal>
       </Row>
       </Container>
     </div>
   );
};
export default Welcome;
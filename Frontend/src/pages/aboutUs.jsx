import React from 'react';
import { Link } from 'react-router-dom';



const AboutUs = () => {
  return (
    <>

    <div>
      <div className='aboutTitle'>
        <h1> We MINIMIZE HUNGER AND FOOD WASTE</h1>
     </div>

     <div className='aboutimg'> 
      <img src="/pantrypalimg.png"
       alt="Pantry bal image a smilling paper bag with a baguette and lettice leaf sticking out" />
    </div>

     <div className='aboutPantryStatement'>

      <h2>About PantryPal</h2>

      <p>PantryPal started as a simple idea from one of our three developers, Shanea, who had firsthand experience working with food pantries and witnessed the urgent need for food access in her community.</p>

      <break></break>

      <p>After a quick conversation, the other two developers, Erick and Esmeralda, jumped on board. Together, we set out to create a single-page application designed to bridge the gap between grocery stores and local communities getting food that can’t be accepted by traditional food banks directly into the hands of the people who need it most.</p>

      <break></break>

      <p> PantryPal isn’t just an app, it’s a movement to reduce food waste while fighting food insecurity, one connection at a time.</p>

      <break></break>

     </div>
     <div>
      <button className="btn-developers" onClick={event =>  window.location.href='/developers'}  >Meet The Developers</button>
     </div>
    </div>


    </>
  );
};

export default AboutUs;
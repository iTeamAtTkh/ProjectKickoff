import React from 'react';

const Home = () => {
  return (
    <>
    
      
      <div className='Container1'>
        <div className='C1L'>
          <h1 className='title'>Welcome to PantryPal</h1>
        </div>
        <div className='C1L'>
          <p className='slogan'>We are revolutionizing how we end hunger. Minimizing hunger</p>
        </div>
        <div className='C1R'>
          <img className='img1' src="" alt="" />
        </div>
      </div>
      <div className='Container2'>
        <div className='Cont-questions'>
          <div className='q1'>
          <h2 className='question'> What is it?</h2>
          <p className='answer'>PantryPal is an app that connects local grocery stores, restaurants, and/or food warehouse with people who need food.
It’s fast, easy, and without the long wait.</p>
          </div>

          <div className='q2'>
          <h2 className='question'> What does it do?</h2>
          <p className='answer'></p>
          </div>

          <div className='q3'>
          <h2 className='question'>Who is it for?</h2>
          <h4>PantryPal Supports:</h4>
          <ul className='answer'>
            <li>Low-income individuals and families</li>
            <li>People experiencing homelessness</li>
            <li>SNAP & WIC recipients</li>
            <li>Students facing food insecurity</li>
            <li>Elderly or bedbound residen</li>

          </ul>
          </div>

        </div>

      </div>
      <div className='Container3'>
        <div >
          <img  className='img2' src="" alt="" />
        </div>

        <div>
          <p className='quote'>By connecting communities with fresh food that would otherwise go to waste, PantryPal fights hunger and food waste at the same time.</p>
        </div>

      </div>


    </>
  );
};

export default Home;
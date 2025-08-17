import React from 'react';

const Home = () => {
  return (
    <>
    
      <p>Home placeholder</p>
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
          <h2 className='question'></h2>
          <p className='answer'></p>
          </div>
          <div className='q2'>
          <h2 className='question'></h2>
          <p className='answer'></p>
          </div>
          <div className='q3'>
          <h2 className='question'></h2>
          <p className='answer'></p>
          </div>
        </div>
      </div>
      <div className='Container3'>
        <div >
          <img  className='img2' src="" alt="" />
        </div>
        <div>
          <p className='quote'>By connecting communities with fresh food that would otherwise go to waste, PantryPal fights hunger and food waste at the same time.
</p>
        </div>

      </div>


    </>
  );
};

export default Home;
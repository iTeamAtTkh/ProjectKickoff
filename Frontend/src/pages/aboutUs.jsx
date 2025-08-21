import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-[#F9F3F0] text-[#C57640]">
      {/* PAGE CONTAINER */}
      <div className="mx-80 max-w-8xl px-25">
        
        {/* BIG TITLE */}
        <div className="aboutTitle justify-items-start">
          <h1 className="mt-12 md:mt-30 text-4xl md:text-6xl lg:text-9xl font-extrabold leading-[1.05] tracking-tight text-center md:text-left ">
            WE MINIMIZE HUNGER
            <br className="hidden md:block" /> AND FOOD WASTE
          </h1>
        </div>

        {/* CONTENT: IMAGE LEFT, TEXT RIGHT */}
        <section className="mx-auto max-w-5xl mt-12 md:mt-20 flex flex-col md:flex-row items-start gap-10 md:gap-4">
          {/* Logo / Illustration */}
          <div className="aboutimg flex-shrink-0 flex justify-center md:justify-start">
            <img
              src="../../public/pantrypalimg.png"
              alt="PantryPal logo (smiling paper bag with food)"
              className="relative w-[800px] h-[800px] right-100 top-25 object-contain bg-[#F7F3EE] p-6 rounded shadow-sm"
            />
          </div>

          {/* Text */}
          <div className="aboutPantryStatement flex-1 text-left">
            <h2 className=" md:text-left italic font-semibold uppercase text-xl md:text-6xl leading-8">
              About PantryPal
            </h2>
            <div class="mt-5 text-[#8b4f2a] w-[820px] h-[913px] text-[36px] flex flex-col items-center">
            <p>
              PantryPal started as a simple idea from one of our three developers, Shanea, who had
              firsthand experience working with food pantries and witnessed the urgent need for food
              access in her community.
            </p>
            <br />
            <p>
              After a quick conversation, the other two developers, Erick and Esmeralda, jumped on
              board. Together, we set out to create a single-page application designed to bridge the
              gap between grocery stores and local communities getting food that can’t be accepted by
              traditional food banks directly into the hands of the people who need it most.
            </p>
            <br />
            <p>
              PantryPal isn’t just an app, it’s a movement to reduce food waste while fighting food
              insecurity, one connection at a time.
            </p>
            </div>
          </div>
        </section>

        {/* CTA BUTTON */}
       <div className="flex flex-col items-center px-[300px] pt-[100px] pb-[15px] isolate">
          <Link
            to="/developers"
            className="mt-12 inline-flex items-center justify-center rounded-lg bg-[#C57640] px-8 py-4 text-[#F9F3F0] text-4xl font-extrabold italic uppercase tracking-wide shadow
                       ring-4 ring-white/80 focus:outline-none focus:ring-4 focus:ring-white w-[851px] h-[118px] "
          >
            Meet the Developers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-[#F9F3F0] text-[#C57640]">
      {/* PAGE CONTAINER */}
      <div className="mx-auto max-w-6xl px-4">

        {/* BIG TITLE */}
        <div className="aboutTitle">
          <h1 className="mt-12 md:mt-20 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            WE MINIMIZE HUNGER
            <br className="hidden md:block" /> AND FOOD WASTE
          </h1>
        </div>

        {/* CONTENT: IMAGE LEFT, TEXT RIGHT */}
        <section className="mt-12 md:mt-16 grid md:grid-cols-[320px,1fr] gap-10 md:gap-16 items-start">
          {/* Logo / Illustration */}
          <div className="aboutimg">
            <img
              src="/images/pantrypalimg.png"
              alt="PantryPal logo (smiling paper bag with food)"
              className="w-[320px] h-[320px] object-contain bg-[#F7F3EE] p-6 rounded shadow-sm"
            />
          </div>

          {/* Text */}
          <div className="aboutPantryStatement">
            <h2 className="text-center italic font-extrabold uppercase text-xl md:text-2xl">
              About PantryPal
            </h2>

            <p className="mt-5 text-[#8b4f2a] leading-7">
              PantryPal started as a simple idea from one of our three developers, Shanea, who had
              firsthand experience working with food pantries and witnessed the urgent need for food
              access in her community.
            </p>

            <p className="mt-5 text-[#8b4f2a] leading-7">
              After a quick conversation, the other two developers, Erick and Esmeralda, jumped on
              board. Together, we set out to create a single-page application designed to bridge the
              gap between grocery stores and local communities getting food that can’t be accepted by
              traditional food banks directly into the hands of the people who need it most.
            </p>

            <p className="mt-5 text-[#8b4f2a] leading-7">
              PantryPal isn’t just an app, it’s a movement to reduce food waste while fighting food
              insecurity, one connection at a time.
            </p>
          </div>
        </section>

        {/* CTA BUTTON */}
        <div className="flex justify-center">
          <Link
            to="/developers"
            className="mt-12 inline-flex items-center justify-center rounded-lg bg-[#C57640] px-8 py-4 text-[#F9F3F0] font-extrabold italic uppercase tracking-wide shadow
                       ring-4 ring-white/80 focus:outline-none focus:ring-4 focus:ring-white"
          >
            Meet the Developers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
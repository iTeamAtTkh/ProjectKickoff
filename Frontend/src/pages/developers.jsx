import React from 'react';

const Developers = () => {
  return (
    <div className="bg-[rgb(249,243,240)] text-[#C57640] px-4 py-16 md:py-24">
      {/* Title */}
      <h1 className="text-center uppercase font-black text-5xl md:text-7xl lg:text-9xl leading-tight">
        Meet the <br className="hidden md:block" /> Developers
      </h1>

      {/* Developers list */}
      <div className="mt-16 flex flex-col gap-14 max-w-6xl mx-auto">
        
        {/* Dev 1 */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            className="w-60 h-60 rounded-full object-cover border border-#C57640"
            src="../../public/Erick.jpeg"
            alt="Erick Samayoa portrait"
          />
          <div>
            <h2 className="devname uppercase font-extrabold text-2xl">Erick Samayoa - Backend Developer</h2>
            <p className="mt-2 text-xl text-[#8b4f2a] leading-relaxed">Erick Samayoa is a Full-Stack Developer and Creative Producer with over 13 years of experience delivering narrative films, commercials, and digital media. 
              He has successfully managed budgets and led teams ranging from 5 to 30 people. 
              <br />
              <br />Erick brings expertise in HTML, CSS, JavaScript, React, Node.js, Supabase, and SQLite, combining technical skill with a strong creative background.
              Known for his ability to solve problems with innovative solutions, Erick is passionate about merging storytelling and technology to design engaging web applications, interactive experiences, and game environments. 
              He is also one of the creators of *PantryPal*, a project dedicated to reducing food waste and increasing community access to resources.
</p>
            <a href="url" className="mt-2 inline-block text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </div>

        {/* Dev 2 */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            className="w-60 h-60 rounded-full object-cover border border-#C57640"
            src="../../public/nexClose.jpeg"
            alt="Shanea Woods portrait"
          />
          <div>
            <h2 className="devname uppercase font-extrabold text-2xl">Shanea Woods - Frontend/UX Designer</h2>
            <p className="mt-2 text-xl text-[#8b4f2a] leading-relaxed">Shanea Woods’ journey into technology began long before the rise of social media. 
              At just 14 years old, she coded her first web page using HTML and CSS. Despite her early start, she chose not to pursue tech at the time, 
              believing it required being “really smart” and heavily math-driven—even though she earned a solid B in calculus. 
              <br />
              <br /> Nearly three decades later, during the pandemic, Shanea rediscovered her passion for technology. After seeing The Knowledge House (TKH) 
              featured on the news, she felt it was the right moment to finally make something of herself in the field. Through perseverance, trial and error, and a commitment she once 
              doubted she could maintain, Shanea has grown into a resilient and creative developer.Collaboration and innovation at TKH expanded her
              perspective, opening her mind to possibilities in both problem-solving and design. This journey ultimately led her to help build and
              design the site "PantryPal", a project that reflects her drive to merge technology with meaningful community impact.</p>
            <a href="url" className="mt-2 inline-block text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </div>

        {/* Dev 3 */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            className="w-60 h-60 rounded-full object-cover border b-#C57640"
            src="../../public/Emse.jpeg"
            alt="Esmeralda Quezada portrait"
          />
          <div>
            <h2 className="devname uppercase font-extrabold  text-2xl">Esmeralda Quezada - Full-Stack Developer</h2>
            <p className="mt-2 text-xl text-[#8b4f2a] leading-relaxed">
             Esmeralda Quezada’s journey in web development began with The Knowledge House (TKH), as she had never previously heard of or understood the field. 
             TKH has been instrumental in her growth as a developer by providing hands-on experience with HTML and CSS, which helped her build strong foundational 
             skills in web development. 
             <br />
             <br />Through JavaScript projects, she learned how to create interactive and dynamic applications, while React taught her how to
             structure scalable front-end interfaces efficiently. Working with Node.js introduced her to server-side programming and backend integration, givingher 
             a full understanding of how web applications operate end-to-end. TKH’s project-based approach encouraged her to solve real-world problems, collaborate
             in teams, and develop critical coding and problem-solving skills. Overall, this journey has been steadily shaping Esmeralda into a confident full-stack 
             developer, ready to tackle complex applications.
            </p>
            <a
              href="https://www.linkedin.com/in/esmeraldaquezada/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 flex justify-center">
        <a
          href="/signup"
          className="imt-12 inline-flex items-center justify-center rounded-lg bg-[#C57640] px-8 py-4 text-[#F9F3F0] text-4xl font-extrabold italic uppercase tracking-wide shadow
                       ring-4 ring-white/80 focus:outline-none focus:ring-4 focus:ring-white w-[851px] h-[118px] hover:opacity-95"
        >
          Sign-Up/Login
        </a>
      </div>
    </div>
  );
};

export default Developers;

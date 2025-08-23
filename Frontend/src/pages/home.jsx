export default function Home() {
  return (
    <div>
      {/* Hero Title */}
<section className="mt-0 mx-0 py-[100px] px-[304px] bg-[#C57640]">
  <div className="mx-auto max-w-7xl px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-20">
    
    {/* Subtitle */}
    <div className="text-[#F9F3F0] flex-1">
      <h1 className="text-6xl md:text-9xl font-extrabold leading-none">
        <span className="block text-center md:text-left font-bold text-7xl md:text-9xl">
          WELCOME&nbsp;TO PANTRYPAL
        </span>
      </h1>
      <p className="mt-8 italic tracking-wide text-2xl md:text-3xl text-center md:text-left">
        WE ARE REVOLUTIONIZING HOW WE END HUNGER.
      </p>
    </div>

{/* Logo */}
<div className="flex-1 flex justify-center md:justify-end">
  <img
    src="/pantrypalimg.png"
    alt="PantryPal logo"
    className="w-full max-w-[748px] h-auto object-contain bg-[#F9F3F0] p-6 rounded shadow-sm"
  />
</div>


  </div>
</section>

     {/* Q & A */}
<section className="mx-auto max-w-7xl px-4 py-20">
  <div className="flex flex-col md:flex-row items-start md:items-center gap-16">
    
    {/* Left: text blocks */}
    <div className="flex-1 space-y-10">
      <div>
        <h2 className="font-extrabold tracking-wide text-3xl md:text-5xl">
          WHAT IS IT?
        </h2>
        <p className="mt-3 text-[#8b4f2a] text-xl md:text-3xl leading-relaxed">
          PantryPal is an app that connects local grocery stores, restaurants,
          and/or food warehouses with people who need food. It’s fast, easy,
          and without the long wait.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold tracking-wide text-3xl md:text-5xl">
          WHAT DOES IT DO?
        </h2>
        <p className="mt-3 text-[#8b4f2a] text-xl md:text-3xl leading-relaxed">
          When partner stores or restaurants have surplus food that’s near its 
          <strong> “Best By” </strong> date, PantryPal sends you a notification. 
          You can then reserve a pickup time or request delivery if you’re home-bound.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold tracking-wide text-3xl md:text-5xl">
          WHO IS IT FOR?
        </h2>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-[#8b4f2a] text-lg md:text-3xl leading-relaxed">
          <li>Low-income individuals and families</li>
          <li>People experiencing homelessness</li>
          <li>SNAP &amp; WIC recipients</li>
          <li>Students facing food insecurity</li>
          <li>Elderly or bed-bound resident</li>
        </ul>
      </div>
    </div>

    {/* Right: photo */}
    <div className="flex-1 flex justify-center md:justify-end md:pl-12">
      <img
        src="../../public/Waitress with Takeout.png"
        alt="Smiling worker with takeout containers"
        className="w-full max-w-lg rounded shadow-md object-cover"
      />
    </div>
  </div>
</section>

      <section className="w-full bg-[#F9F3F0] px-6 py-12">
  <div className="flex">
    <p className="w-full text-center md:text-center uppercase font-extrabold italic text-2xl md:text-3xl leading-relaxed">
      By connecting communities with fresh food that would otherwise go to waste,<br /> 
      PantryPal fights hunger and food waste at the same time.
    </p>
  </div>
</section>

    </div>
  );
}

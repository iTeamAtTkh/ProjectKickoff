export default function Home() {
  return (
    <div>
      {/* Hero Title*/}
      <section className="bg-[#C57640]">
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Subtitle */}
          <div className="text-[#F9F3F0]">
            <h1 className="text-6xl md:text-9xl font-extrabold leading-none">
              WELCOME TO <br /> PANTRYPAL
            </h1>
            <p className="mt-8 italic tracking-wide text-2xl md:text-3xl">
              WE ARE REVOLUTIONIZING <br />HOW WE END HUNGER.
            </p>
          </div>

          {/* Logo*/}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/pantrypal-logo.png"
              alt="PantryPal logo"
              className="w-72 h-72 md:w-96 md:h-96 object-contain bg-[#F9F3F0] p-6 rounded shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Q & A */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text blocks */}
          <div className="space-y-10">
            <div>
              <h2 className="font-extrabold tracking-wide text-3xl md:text-4xl">
                WHAT IS IT?
              </h2>
              <p className="mt-3 text-[#8b4f2a] text-xl md:text-2xl">
                PantryPal is an app that connects local grocery stores, restaurants,
                and/or food warehouses with people who need food. It’s fast, easy,
                and without the long wait.
              </p>
            </div>

            <div>
              <h2 className="font-extrabold tracking-wide text-3xl md:text-4xl">
                WHAT DOES IT DO?
              </h2>
              <p className="mt-3 text-[#8b4f2a] text-xl md:text-2xl">
                When partner stores or restaurants have surplus food that’s near its
                “Best By” date, PantryPal sends you a notification. You can then
                reserve a pickup time or request delivery if you’re home-bound.
              </p>
            </div>

            <div>
              <h2 className="font-extrabold tracking-wide text-3xl md:text-4xl">
                WHO IS IT FOR?
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#8b4f2a] text-lg md:text-2xl">
                <li>Low-income individuals and families</li>
                <li>People experiencing homelessness</li>
                <li>SNAP &amp; WIC recipients</li>
                <li>Students facing food insecurity</li>
                <li>Elderly or bed-bound resident</li>
              </ul>
            </div>

            <p className="mt-8 uppercase text-center md:text-left font-extrabold italic text-2xl md:text-xl">
              By connecting communities with fresh food that would otherwise go to
              waste.PantryPal fights hunger and food waste at the same time.
            </p>
          </div>

          {/* Right: photo */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/hero-person.jpg"
              alt="Smiling worker with takeout containers"
              className="w-full max-w-lg rounded shadow-md object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}


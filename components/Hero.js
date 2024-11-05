import Image from "next/image";
import SearchBox from "./SearchBox"; 

const Hero = () => {
  return (
    <section className="relative max-w-screen-full mx-auto px-8 py-8 lg:py-20">
    {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/homesplash.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center text-white gap-6 lg:gap-8">
        {/* Heading and subtext */}
        <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight">
          Home is where you want to be.
        </h1>
        <p className="text-lg leading-relaxed">
          We are changing the game by making house hunting a breeze.
        </p>

        {/* Search form - replaced with SearchBox component */}
        <div className="w-full max-w-2xl">
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spotlight from "@/components/Spotlight";
import ExploreProperties from "@/components/ExploreProperties";
import Footer from "@/components/Footer";

export default function Home() {
  // Sample data for properties
  const propertiesData = [
    {
      title: "London",
      count: 82, // Population in millions
      imageUrl: "/London.png",
      link: "/property/greater-london/london"
    },
    {
      title: "Birmingham",
      count: 12,
      imageUrl: "/Birmingham.png",
      link: "/property/west-midlands/birmingham"
    },
    {
      title: "Manchester",
      count: 23,
      imageUrl: "/Manchester.png",
      link: "/property/greater-manchester/manchester"
    },
    {
      title: "Glasgow",
      count: 8,
      imageUrl: "/Glasgow.png",
      link: "/property/glasgow-city/glasgow"
    },
    {
      title: "Bristol",
      count: 5,
      imageUrl: "/Bristol.png",
      link: "/property/bristol/bristol"
    },
  ];
  
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Spotlight />
        <ExploreProperties properties={propertiesData} /> 
      </main>
      <Footer />
    </>
  );
}

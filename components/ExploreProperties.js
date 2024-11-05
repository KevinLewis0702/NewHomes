import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 

const PropertyCard = ({ imageUrl, title, count, linkUrl }) => (
  <Link href={linkUrl} passHref> {/* Wrap the card content with Link */}
    <a className="relative m-2 block"> 
      <Image 
        src={imageUrl} 
        alt={title} 
        width={500} // Replace 500 with the actual width of your image
        height={100} // Replace 100 with the actual height of your image
        className="object-cover w-60 h-80 rounded-lg shadow-lg" />
      <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 rounded-b-lg">
        <p className="text-white text-sm">{count} Properties</p>
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
    </a>
  </Link>
);

const ExploreProperties = ({ properties }) => (
  <section className="text-center p-8">
    <h2 className="text-3xl font-bold">Explore Our Properties</h2>
    <p className="text-gray-600 mt-2">Check out new build homes across the country</p>
    <div className="mt-8 flex flex-wrap justify-center md:flex-nowrap md:overflow-x-auto">
      {properties.map((property) => (
        <PropertyCard
          key={property.title}
          imageUrl={property.imageUrl}
          title={property.title}
          count={property.count}
          linkUrl={property.link}
        />
      ))}
    </div>
  </section>
);


export default ExploreProperties;
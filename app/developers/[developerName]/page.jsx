"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlaceHolderImage from "@/public/placeholder.png";

function DeveloperPage({ params: { developerName } }) {
  console.log("Developer name from URL:", developerName);
  const [developer, setDeveloper] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const encodedDeveloperName = encodeURIComponent(developerName);
      console.log("Encoded Developer Name:", encodedDeveloperName); // Debug log
      const res = await fetch(`/api/developer/${encodedDeveloperName}`);
      const data = await res.json();
      console.log("dev!", data);
      setDeveloper(data.developer);
      setProperties(data.properties);
      console.log("properties", properties);
      console.log("Developer Data:", data.developer);
      console.log("Properties Data:", data.properties);
    }
    fetchData();
  }, [developerName]);

  const Menu = dynamic(() => import("@/components/Menu"), {
    ssr: false,
  });

  const menuItems = [
    { name: "Developer Details", path: "#overview" },
    { name: "Developer Properties", path: "#properties" },
    { name: "Contact Details", path: "#contact" },
  ];

  const PropertyList = ({ properties }) => {
    return (
      <div className="properties-list">
        {properties.map((property) => (
          <div
            key={property.propId}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-full md:max-w-3xl"
          >
            <div className="md:flex-shrink-0 h-36 w-full object-cover md:w-48 relative">
              <Image
                src={property.featuredImage || PlaceHolderImage}
                alt={property.name}
                objectFit="contain"
                fill
                className="h-36 w-full object-cover md:w-48 relative" // Smaller image
                quality={70}
                priority={false}
                blurDataURL={property?.featuredImage || "/placeholder.png"}
                placeholder="blur"
              />
            </div>

            {/* Details Section */}
            <div className="p-4">
              <Link href={`/property/${property.address.area}/${property.address.city}/${property.slug}`}>
                <div className="block mt-1 text-md leading-tight font-medium text-black hover:underline">
                  {property.name}
                </div>
              </Link>
              {/* Optional: Short address and truncated description */}
              <p
                className="mt-2 text-gray-600 text-sm"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(property.newDescription, 20),
                }}
              ></p>
              {/* Price Information */}
              <div className="mt-3">
                <span className="text-teal-600 text-md font-semibold">
                  {property.currency}
                  £{property.priceFrom?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600"> / Guide Price</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const truncateDescription = (description, wordLimit) => {
    // Check if description is a string and not undefined or null
    if (typeof description === 'string') {
      const words = description.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return description;
    } else {
      // Return a default string or empty string if description is not valid
      return "Description not available."; // Or simply return "" for an empty string
    }
  };

  const ContactCard = () => {
    return (
      <div className="card bg-white shadow-md w-full my-4">
        <div className="card-body">
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Knight Frank, Southbank</p>
                <p>18 York Road, London, SE1 7ND</p>
                <a href="#" className="text-indigo-600 hover:underline">
                  More properties from this agent
                </a>
              </div>
              <Image
                src="/knightfranklogo.png"
                alt="Knight Frank Logo"
                className="h-12"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary flex-1">Call agent</button>
            <button className="btn btn-outline flex-1">Request details</button>
          </div>
        </div>
      </div>
    );
  };

  const DeveloperDetail = ({ icon, title, value }) => (
    <div className="flex flex-col items-center">
      {icon}
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-sm">{value}</p>
    </div>
  );

  const developerDescription = developer
    ? developer.mainDescription
    : "Loading description...";

  const LocationCard = ({ title, googleMapsEmbedLink }) => {
    return (
      <div className="card bg-white shadow-md w-full my-4" id="contact">
        <div className="card-body">
          <h2 className="font-semibold text-xl mb-3">{title}</h2>
          <div
            className="map-container"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <iframe
              title="Google Maps"
              src={googleMapsEmbedLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  return !developer ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header />

      {/* Main Content and Sidebar Flex Container */}
      <div className="flex flex-row mt-3 gap-3 px-4">
        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="card bg-white shadow-md w-full my-4">
            <div className="card-body">
              <h2 className="font-semibold text-xl mb-3">
                About {developer.name}
              </h2>
              {developer.imageURL && (
                <img
                  src={developer.imageURL}
                  alt={`Featured image of ${developer.name}`}
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              )}
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: developerDescription }}
              ></p>
            </div>
          </div>
          <div className="card bg-white shadow-md w-full my-4" id="properties">
            <div className="card-body">
              <h2 className="font-semibold text-xl mb-3">
                About {developer.name} Properties
              </h2>

              <PropertyList properties={properties} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
     
      </div>

      <Footer />
    </div>
  );
}

export default DeveloperPage;

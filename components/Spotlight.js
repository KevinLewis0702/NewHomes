import React from "react";
import axios from "axios";
import Image from "next/image";

const Spotlight = async () => {
  let listings = [];

  const currentPage = 0;
  const limit = 10;

  try {
    const response = await axios.get(
      `/api/property?page=${currentPage}&limit=${limit}`
    );
    listings = response.data;
  } catch (error) {
    console.error("Failed to fetch spotlight properties:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Discover Latest New Build Homes
        </h2>
        <p className="text-lg">Find new build homes near you</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              width={400}
              height={250}
              objectFit="cover"
              className="w-full"
              quality={70}
            />
            <div className="p-4 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{listing.price}</h3>
              <p className="font-semibold mb-2">{listing.title}</p>
              <p className="text-sm opacity-75 mb-4">{listing.address}</p>
              <div className="flex justify-between items-center text-sm">
                <p>{listing.type}</p>
                <p>{listing.postedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;

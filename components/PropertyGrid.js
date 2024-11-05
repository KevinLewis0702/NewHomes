import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatStringToURL } from "@/utils/url-format";
import PlaceHolderImage from "@/public/placeholder.png";

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(price);
  };

function PropertyGrid({ properties, currentPage, totalPages, handlePrevious, handleNext }) {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties && properties.length > 0 && properties.map((property) => (
          <div key={property.propId} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link
              href={`/property/${formatStringToURL(property.address.area)}/${formatStringToURL(property.address.city)}/${formatStringToURL(property.name)}`}
            >
              <div className="bg-cover bg-center h-48 relative">
                <Image
                  src={property.featuredImage || PlaceHolderImage}
                  alt={property.name}
                  layout="fill" 
                  objectFit="cover"
                  quality={70}
                  priority={false}
                  blurDataURL={property?.featuredImage || "/placeholder.png"}
                  placeholder="blur"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link
                href={`/property/${formatStringToURL(property.address.area)}/${formatStringToURL(property.address.city)}/${formatStringToURL(property.name)}`}
              >
                <h3 className="font-bold text-lg cursor-pointer hover:text-blue-800">
                  {property.name}
                </h3>
              </Link>
              <p className="text-gray-700">
                {property.address.shortAddress}
              </p>
              <p className="text-gray-900">
                {`${formatPrice(property.priceFrom)} - ${property.priceTo ? formatPrice(property.priceTo) : "N/A"}`}
</p>
              <p className="text-gray-600">{property.developerName}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {properties && properties.length === 0 && <p>No properties found.</p>}
    </main>
  );
}

export default PropertyGrid;

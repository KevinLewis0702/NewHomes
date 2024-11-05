// Import React and necessary hooks
import React from 'react';

// Import icons from your assets or define them here
import { Phone } from '@/app/Icons';

// Individual amenity component
const Amenity = ({ icon, title }) => (
  <div className="flex items-center mb-2">
    {icon}
    <span className="ml-2">{title}</span>
  </div>
);

// Property Amenities component
const PropertyAmenities = () => {
  return (
    <div className="bg-white shadow-md w-full my-4 p-4">
      <h3 className="font-semibold text-lg mb-3">Property Amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Amenity icon={<Phone />} title="Kitchen" />
        <Amenity icon={<Phone />} title="Wi-Fi" />
        <Amenity icon={<Phone />} title="Pool" />
        <Amenity icon={<Phone />} title="Lift" />
        <Amenity icon={<Phone />} title="Washing machine" />
        <Amenity icon={<Phone />} title="Air conditioning" />
        <Amenity icon={<Phone />} title="Free dryer – In unit" />
        <Amenity icon={<Phone />} title="Security cameras on property" />
      </div>
    </div>
  );
};

export default PropertyAmenities;

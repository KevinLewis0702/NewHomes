"use client";

import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSearch } from "@/providers/SearchProvider";
import { Combobox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { useDebounce } from "usehooks-ts";
import { useVirtualizer } from "@tanstack/react-virtual";

const VirtualizedList = ({ filteredCities }) => {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: filteredCities.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className=" absolute  w-full z-10"
    >
      <Combobox.Options className={"w-full"}>
        {filteredCities.length === 0 ? (
          <div className="bg-white relative cursor-default select-none px-4 py-2 text-gray-700">
            Nothing found.
          </div>
        ) : (
          <div
            className="max-h-[300px] absolute w-full overflow-y-auto bg-white"
            ref={parentRef}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
                pointerEvent: "none",
                touchAction: "none",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                <Combobox.Option
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    } `
                  }
                  value={filteredCities[virtualItem.index]}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {filteredCities[virtualItem.index]}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </div>
          </div>
        )}
      </Combobox.Options>
    </Transition>
  );
};

const FilterBar = () => {
  const {
    propertyType,
    setPropertyType,
    rooms,
    setRooms,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    location,
    setLocation,
    selectedFeature,
    setSelectedFeature,
    yearBuilt,
    setYearBuilt,
    handleSearch,
    cities,
  } = useSearch();

  const [filteredCities, setFilteredCities] = useState([]);
  const [query, setQuery] = useState("");

  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    setFilteredCities(
      debouncedValue === ""
        ? cities
        : cities.filter((city) => {
            return city.toLowerCase().includes(debouncedValue.toLowerCase());
          })
    );
  }, [debouncedValue, cities]);

  // Price range arrays
  const minPriceOptions = [
    "50000",
    "60000",
    "70000",
    "80000",
    "90000",
    "100000",
    "110000",
    "120000",
    "125000",
    "130000",
    "140000",
    "150000",
    "160000",
    "170000",
    "175000",
    "180000",
    "190000",
    "200000",
    "210000",
    "220000",
    "230000",
    "240000",
    "250000",
    "260000",
    "270000",
    "280000",
    "290000",
    "300000",
    "325000",
    "350000",
    "375000",
    "400000",
    "425000",
    "450000",
    "475000",
    "500000",
    "550000",
    "600000",
    "650000",
    "700000",
    "800000",
    "900000",
    "1000000",
    "1250000",
    "1500000",
    "1750000",
    "2000000",
    "2500000",
    "3000000",
    "4000000",
    "5000000",
    "7500000",
  ];

  const maxPriceOptions = [
    "50000",
    "60000",
    "70000",
    "80000",
    "90000",
    "100000",
    "110000",
    "120000",
    "125000",
    "130000",
    "140000",
    "150000",
    "160000",
    "170000",
    "175000",
    "180000",
    "190000",
    "200000",
    "210000",
    "220000",
    "230000",
    "240000",
    "250000",
    "260000",
    "270000",
    "280000",
    "290000",
    "300000",
    "325000",
    "350000",
    "375000",
    "400000",
    "425000",
    "450000",
    "475000",
    "500000",
    "550000",
    "600000",
    "650000",
    "700000",
    "800000",
    "900000",
    "1000000",
    "1250000",
    "1500000",
    "1750000",
    "2000000",
    "2500000",
    "3000000",
    "4000000",
    "5000000",
    "7500000",
  ];

  const formatPrice = (price) => {
    return parseInt(price).toLocaleString();
  };

  const propertyFeatures = ["Gym", "Cinema", "Swimming Pool", "Concierge"];

  const handleFeatureChange = (e) => {
    setSelectedFeature(e.target.value);
  };

  const handleYearChange = (e) => {
    setYearBuilt(e.target.value);
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
        <div className="flex space-x-2 flex-grow items-center">
          <Combobox
            value={location}
            onChange={(v) => {
              setLocation(query == "" ? query : v);
            }}
          >
            <div className="relative h-[40px] flex-grow">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm bg-white">
                <Combobox.Input
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value == "") setLocation("");
                  }}
                  className="w-full border-none outline-none lpy-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 h-[40px]"
                  displayValue={(city) => (query == "" ? query : city)}
                />
              </div>

              <VirtualizedList filteredCities={filteredCities} />
            </div>
          </Combobox>
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option>Property types</option>
            <option>House</option>
            <option>Apartment</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          >
            <option>Bedrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          {/* Min Price Dropdown */}
          <select
            className="..."
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            {minPriceOptions.map((price) => (
              <option key={price} value={price}>
                {price ? `£${formatPrice(price)}` : "Min Price"}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Max Price Dropdown */}
          <select
            className="..."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            {maxPriceOptions.map((price) => (
              <option key={price} value={price}>
                {price ? `£${formatPrice(price)}` : "Max Price"}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Dropdown for Property Features */}
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={selectedFeature}
            onChange={handleFeatureChange}
          >
            <option value="">Select Feature</option>
            <option value="Gym">Gym</option>
            <option value="Cinema">Cinema</option>
            <option value="Swimming Pool">Swimming Pool</option>
            <option value="Concierge">Concierge</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          {/* Dropdown for Year Built */}
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={yearBuilt}
            onChange={handleYearChange}
          >
            <option value="">Year Built</option>
            {/* Generate years from 2012 to 2027 */}
            {[...Array(2028 - 2012).keys()].map((year) => (
              <option key={year} value={2012 + year}>
                {2012 + year}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2 md:col-span-3 sm:col-span-2">
          <button
            className="shrink-0 text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded py-2 px-3 w-auto"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

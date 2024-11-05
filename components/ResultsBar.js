// ResultsBar.js
import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSearch } from "@/providers/SearchProvider";

const ResultsBar = ({ totalResults }) => {
  const { sortOrder, sortBy, setSortBy, setSortOrder, handleSearch } =
    useSearch();

  useEffect(() => {
    if (sortOrder && sortBy && handleSearch) handleSearch();
  }, [sortOrder, sortBy]);

  return (
    <div className="px-4 py-2 flex justify-between items-end border-b">
      <div className="text-sm text-gray-600">
        <span>{totalResults} results</span>
      </div>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setSortBy("price");
          }}
        >
          {/* Map your sort options here */}
          <option value="asc">Lowest Price</option>
          <option value="desc">Highest Price</option>
          {/* Add other sort options as needed */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          {<IoIosArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default ResultsBar;

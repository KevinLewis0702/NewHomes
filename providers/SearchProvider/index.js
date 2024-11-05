"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import axios from "axios";
import { formatStringToURL } from "@/utils/url-format";
export const initialValue = {
  propertyType: "All types",
  rooms: "Any",
  minPrice: "",
  maxPrice: "",
  location: "",
  selectedFeature: "",
  yearBuilt: "",
  sortBy: "",
  sortOrder: "asc",
  cities: [],
  setPropertyType: () => {},
  setRooms: () => {},
  setMinPrice: () => {},
  setMaxPrice: () => {},
  setLocation: () => {},
  setSelectedFeature: () => {},
  setYearBuilt: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
};

const SearchContext = createContext(initialValue);

export const useSearch = () => useContext(SearchContext);

const SearchProvider = (props) => {
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(initialValue.sortOrder);
  const [cities, setCities] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const queryParams = [];

    if (location) queryParams.push(`q=${formatStringToURL(location.trim())}`);
    if (propertyType)
      queryParams.push(`type=${formatStringToURL(propertyType.trim())}`);
    if (rooms) queryParams.push(`beds=${formatStringToURL(rooms.trim())}`);
    if (minPrice)
      queryParams.push(`minPrice=${formatStringToURL(minPrice.trim())}`);
    if (maxPrice)
      queryParams.push(`maxPrice=${formatStringToURL(maxPrice.trim())}`);
    if (selectedFeature && typeof selectedFeature === "string") {
      queryParams.push(`feature=${formatStringToURL(selectedFeature.trim())}`);
    }
    if (sortBy) {
      queryParams.push(`sortBy=${formatStringToURL(sortBy.trim())}`);
      queryParams.push(`sortOrder=${formatStringToURL(sortOrder.trim())}`);
    }

    const redirectPath = `${props?.pageRoute || "/property"}?${queryParams.join(
      "&"
    )}`;
    // Check if no changes on search param
    if (
      (searchParams.get("q") || "") == formatStringToURL(location.trim()) &&
      (searchParams.get("type") || "") ==
        formatStringToURL(propertyType.trim()) &&
      (searchParams.get("beds") || "") == formatStringToURL(rooms.trim()) &&
      (searchParams.get("minPrice") || "") ==
        formatStringToURL(minPrice.trim()) &&
      (searchParams.get("maxPrice") || "") ==
        formatStringToURL(maxPrice.trim()) &&
      (searchParams.get("feature") || "") ==
        formatStringToURL(selectedFeature.trim()) &&
      (searchParams.get("sortBy") || "") == formatStringToURL(sortBy.trim()) &&
      (searchParams.get("sortOrder") || "") ==
        formatStringToURL(sortOrder.trim())
    )
      return;
    else {
      NProgress.start();
      router.push(redirectPath);
    }
  };

  useEffect(() => {
    axios.get("/api/cities").then((res) => {
      setCities(res?.data?.cities || []);
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        propertyType,
        rooms,
        minPrice,
        maxPrice,
        location,
        selectedFeature,
        yearBuilt,
        sortBy,
        sortOrder,
        cities,
        setPropertyType,
        setRooms,
        setMinPrice,
        setMaxPrice,
        setLocation,
        setSelectedFeature,
        setYearBuilt,
        setSortBy,
        setSortOrder,
        handleSearch,
      }}
    >
      {props?.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

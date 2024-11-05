"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ResultsBar from "@/components/ResultsBar";
import PropertyGrid from "@/components/PropertyGrid"; 
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import Image from "next/image";
import PlaceHolderImage from "@/public/placeholder.png";
import SearchProvider from "@/providers/SearchProvider";
import { formatStringToURL } from "@/utils/url-format";

const Property = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  useEffect(() => {
    axios
      .get(
        `/api/property?city=${encodeURIComponent(
          searchParams.get("q") || ""
        )}&type=${encodeURIComponent(
          searchParams.get("type") || ""
        )}&bedCounts=${encodeURIComponent(
          searchParams.get("beds") || ""
        )}&minPrice=${encodeURIComponent(
          searchParams.get("minPrice") || ""
        )}&maxPrice=${encodeURIComponent(
          searchParams.get("maxPrice") || ""
        )}&feature=${encodeURIComponent(
          searchParams.get("feature") || ""
        )}&page=${currentPage}&limit=${limit}
        &sortBy=${encodeURIComponent(
          searchParams.get("sortBy") || ""
        )}&sortOrder=${encodeURIComponent(searchParams.get("sortOrder") || "")}`
      )
      .then((response) => {
        NProgress.done();
        setProperties(response.data.properties);
        const totalItems = response.data.total;
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / limit) || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchParams, currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  ) : (
    <SearchProvider>
      <Header />
      <FilterBar />
      <div className="max-w-7xl mx-auto p-4">
        <ResultsBar
          totalResults={totalCount}
          sortOptions={[
            { label: "Highest Price", value: "price-desc" },
            { label: "Lowest Price", value: "price-asc" },
          ]}
        />
      </div>
      <PropertyGrid
  properties={properties}
  currentPage={currentPage}
  totalPages={totalPages}
  handlePrevious={handlePrevious}
  handleNext={handleNext}
/>
      <Footer />
    </SearchProvider>
  );
};

export default Property;

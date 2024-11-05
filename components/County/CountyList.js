"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResultsBar from "@/components/ResultsBar";
import PropertyGrid from "@/components/PropertyGrid";
import axios from "axios";
import PropertyItem from "@/components/Property/PropertyItem";
import SearchProvider from "@/providers/SearchProvider";
import { useSearchParams, usePathname } from "next/navigation";
import { formatStringToURL } from "@/utils/url-format";
import PlaceHolderImage from "@/public/placeholder.png";
import NProgress from "nprogress";

function CountyList({ params: { county } }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const limit = 12;

  // Url Correction for the space(%20) to be changed as dash(-)
  useEffect(() => {
    if (window) {
      console.log("window", window);
      window.history.replaceState(
        window.history.state,
        "",
        window.location.href.replaceAll("%20", "-").toLowerCase()
      );
    }
  }, []);
  // useEffect End for Url Correction

  // Fetch data from api
  useEffect(() => {
    axios
      .get(
        `/api/property?city=${encodeURIComponent(
          searchParams.get("q") || ""
        )}&type=${encodeURIComponent(
          searchParams.get("type") || ""
        )}&area=${encodeURIComponent(
          county.replaceAll("%20", "-") || ""
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
          )}&sortOrder=${encodeURIComponent(
          searchParams.get("sortOrder") || ""
        )}`
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
  }, [searchParams, currentPage, county]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return null;
  }

  const crumbs = [{ title: "Home", href: "/" }];
  if (county)
    crumbs.push({ title: county, href: `/property/${county.toLowerCase()}` });

  // Shows a list of property as a search page when it has several properties and property detail for a single property

  return (
    <SearchProvider pageRoute={pathname}>
      <Header />
      <FilterBar />
      <div className="max-w-7xl mx-auto p-4">
        <ResultsBar
          totalResults={totalCount}
          sortOptions={[
            { label: "Highest Price", value: "price-desc" },
            { label: "Lowest Price", value: "price-asc" },
            // ...other sort options
          ]}
        />
      </div>
      <div className="flex-grow">
        <div className="text-blue-600  max-w-7xl mx-auto p-4">
          <Breadcrumbs crumbs={crumbs} />
        </div>
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
}

export default CountyList;

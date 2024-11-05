"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchDevelopers = async () => {
        try {
            console.log(`Requesting: /api/developer?page=${currentPage}&limit=${limit}`);
            const response = await axios.get(`/api/developer?page=${currentPage}&limit=${limit}`);
            console.log("Response data:", response.data);
            setDevelopers(response.data.developers);
            console.log("Developers after set:", developers);
            const totalItems = response.data.total;
            console.log("Total items:", totalItems);
            setTotalPages(Math.ceil(totalItems / limit) || 0);
        } catch (error) {
            console.error('Failed to fetch developers', error);
        }
    };

    fetchDevelopers();
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const DeveloperCard = ({ developer }) => {
    return (
      <div className="flex items-center p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={developer.imageURL}
          alt={`${developer.name} Logo`}
          width={200}
          height={50}
          className="h-12 w-12 object-contain mr-4"
        />
        <div className="flex-grow">
          <Link href={`/developers/${encodeURIComponent(developer.slug)}`}>
            <span className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
              {developer.name}
            </span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 space-y-4">
        {developers && developers.length > 0 ? (
          developers.map((developer) => (
            <DeveloperCard key={developer._id} developer={developer} />
          ))
        ) : (
          <p>No developers found.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Developers;
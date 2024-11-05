"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/property?q=${encodeURIComponent(searchTerm.trim().replaceAll(" ", "-"))}`
    );
    NProgress.start();
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-input px-4 py-2 w-full text-black"
      />
      <button type="submit" className="p-2">
        {/* Search Icon */}
      </button>
    </form>
  );
};

export default SearchBox;

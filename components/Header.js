"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import ButtonAccount from "./ButtonAccount";
import logo from "@/app/logo.png";
import config from "@/config";
import { Suspense } from "react";

const links = [
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/property",
    label: "Properties",
  },
  {
    href: "/developers",
    label: "Developers",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
];

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const { data: session, status } = useSession();
  const userIsSignedIn = status === "authenticated";

  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const cta = userIsSignedIn ? (
    <ButtonAccount extraStyle="btn-primary" />
  ) : (
    <ButtonSignin extraStyle="btn-primary" />
  );

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <Suspense>
      <header className="bg-custom-header">
      <nav
  className="container flex items-center justify-between px-8 py-1 mx-auto"
  aria-label="Global"
  style={{ height: '60px' }} 
>
          {/* Logo container */}
          <div className="flex lg:flex-1">
            <Link
              className="flex items-center gap-2 shrink-0"
              href="/"
              title={`${config.appName} homepage`}
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                placeholder="blur"
                priority={true}
                width={187}
                height={33}
              />
            </Link>
          </div>

          {/* Right container for both links and CTA */}
          <div className="flex items-center">
            {/* Burger button to open menu on mobile */}
            <div className="lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setIsOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="white" // Changed to white here
  className="w-6 h-6" // Removed text-base-content which might be overriding the color
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  />
</svg>

              </button>
            </div>

            {/* Links container */}
            <div className="hidden lg:flex lg:items-center mr-4">
              {" "}
              {/* Adjust right margin if needed */}
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="link link-hover nav-link" // The nav-link class should apply the right margin
                  title={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>

      
          </div>
        </nav>

  {/* Mobile menu, show/hide based on menu state. */}
<div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
  className="fixed right-0 z-10 px-8 py-4 overflow-y-auto bg-custom-header sm:w-64 transform origin-top-right transition ease-in-out duration-300 shadow-lg" // Use the same background class as the header and set a fixed width
  style={{ top: '60px' }} // Position it right below the header
>
    {/* Logo/name on small screens */}
    <div className="flex items-center justify-between">
      <button
        type="button"
        className="-m-2.5 rounded-md p-2.5"
        onClick={() => setIsOpen(false)}
      >
        <span className="sr-only">Close menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white" 
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    {/* Links on small screens */}
    <div className="flow-root mt-6">
      <div className="py-4">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="block text-white py-2" 
            title={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>
      </header>
    </Suspense>
  );
};

export default Header;

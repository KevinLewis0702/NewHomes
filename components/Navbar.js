"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonAccount from "./ButtonAccount";
import logo from "@/app/logo.png";
import config from "@/config";

const links = [
  {
    href: "/dashboard",
    label: "User Dashboard",
  },
  {
    href: "/dashboard/addcompany",
    label: "Add Company",
  }
];

const cta = <ButtonAccount extraStyle="btn-primary" />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className="bg-custom-header">
  <nav
  className="container flex items-center justify-between px-8 py-4 mx-auto"
  aria-label="Global"
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
          stroke="currentColor"
          className="w-6 h-6 text-base-content"
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
    <div className="hidden lg:flex lg:items-center mr-4"> {/* Adjust right margin if needed */}
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="link link-hover"
          title={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>

    {/* CTA container */}
    <div>{cta}</div>
  </div>
</nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
          <Link
  className="flex items-center gap-2 shrink-0 "
  title={`${config.appName} homepage`}
  href="/"
>
  <Image
    src={logo}
    alt={`${config.appName} logo`}
    placeholder="blur"
    priority={true}
    width={187}
    height={33}
  />
  {/* Removed the span element displaying the company name */}
</Link>
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
                stroke="currentColor"
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

          {/* Your links on small screens */}
          <div className="flow-root mt-6">
            <div className="py-4">
            <div className="hidden lg:flex lg:items-center space-x-8"> 
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            <div className="flex flex-col">{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

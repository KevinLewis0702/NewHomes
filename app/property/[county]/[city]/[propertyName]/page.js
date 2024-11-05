"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  ProfileIcon,
  GroupIcon,
  ConciergeIcon,
  ParkingIcon,
  TaskCompleteIcon,
  Industry,
  Pin,
  TwoUsers,
  Company,
  Globe,
  Phone,
  Mail,
  X,
  Fb,
  Lknd,
  Download,
  GymIcon,
  CinemaIcon,
  SwimmingIcon,
  HouseIcon,
  LineIcon,
  FinancialIcon,
  PieIcon,
  DocIcon,
  ThreePersons,
} from "@/app/Icons";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResultsBar from "@/components/ResultsBar";
import MortgageCalculator from "@/components/MortgageCalculator";
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";
import ContactForm from "@/components/ContactForm";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";

const SidebarPlaceholder = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 sticky top-0">
      <div className="text-gray-900 font-bold text-xl mb-2">
        Similar Properties
      </div>
      <div className="border-b-2 border-gray-100 mb-2"></div>
      <div className="flex items-center mb-4">
        <span className="bg-gray-300 h-4 w-4 mr-2"></span>
        <span className="text-gray-700">
          2 bed semi-detached house for sale
        </span>
      </div>
      <div className="text-gray-500">Knights Road, Oxford OX4</div>
    </div>
  );
};

// Generate segments for [category]
// export async function generateStaticParams({ params: { county, city } }) {
//   const properties = await fetch(
//     `${process.env.REACT_APP_API_URL}/api/property?city=${
//       city.replaceAll("%20", "-") || ""
//     }&area=${county.replaceAll("%20", "-") || ""}`
//   ).then((res) => res.json());

//   return properties.properties.map((property) => ({
//     propertyName: property.name,
//   }));
// }

function PropertyPage({ params: { county, city, propertyName } }) {
  console.log("Parameters received:", { county, city, propertyName });
  const [properties, setProperties] = useState([]);
  const [developer, setDeveloper] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const contactFormRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const seoTags = getSEOTags({
    title: `${properties[0]?.name}`,
    description: `${properties[0]?.metaDescription}`,
    keywords: `${properties[0]?.name}, ${city}, ${county}`,
    openGraph: {
      title: `${properties[0]?.name}`,
      description: `${properties[0]?.metaDescription}`,
      url: `newbuildhomes.org/properties/${county
        .toLowerCase()
        .replace(/\s+/g, "-")}/${city
        .toLowerCase()
        .replace(/\s+/g, "-")}/${propertyName
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      image: properties[0]?.imageList?.split("|")[0],
    },
    canonicalUrlRelative: `/properties/${county
      .toLowerCase()
      .replace(/\s+/g, "-")}/${city
      .toLowerCase()
      .replace(/\s+/g, "-")}/${propertyName
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
  });

  const scrollToContactForm = () => {
    const contactFormElement = document.getElementById("contact-form-marker");
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const galleryImages = properties?.[0]?.imageList
    ? properties?.[0]?.imageList?.split("|")
    : [];

  const preloadImages = () => {
    if (galleryImages.length > 1) {
      const nextIndex = (currentImageIndex + 1) % galleryImages.length;
      const prevIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    }
  };

  useEffect(() => {
    if (window) {
      console.log("window", window);
      window.history.replaceState(
        window.history.state,
        "",
        window.location.href.replaceAll("%20", "-")
      );
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data for:", { city, county, propertyName });
      const res = await axios.get(
        `/api/property?city=${city.replaceAll("%20", "-") || ""}&area=${
          county.replaceAll("%20", "-") || ""
        }&name=${propertyName || ""}`
      );
      const data = res.data;
      console.log("API Response:", res.data);
      setProperties(data.properties);

      try {
        const devRes = await axios.get(
          `/api/developer/${data.properties[0].developerSlug}`
        );
        if (devRes.data.developer) {
          setDeveloper(devRes.data.developer);
        }
      } catch (error) {
        console.error("Error fetching developer data:", error);
      }

      setLoading(false);
    }

    fetchData();
  }, [city, county, propertyName]);

  console.log("SEO Tags:", seoTags);

  useEffect(() => {
    preloadImages();
  }, [currentImageIndex, galleryImages]);

  const Menu = dynamic(() => import("@/components/Menu"), {
    ssr: false,
  });

  const crumbs = [{ title: "Home", href: "/" }];

  if (county) {
    const countySlug = county.toLowerCase().replace(/\s+/g, "-");
    crumbs.push({ title: county, href: `/property/${countySlug}` });
  }

  if (city) {
    const citySlug = city.toLowerCase().replace(/\s+/g, "-");
    const countySlug = county.toLowerCase().replace(/\s+/g, "-");
    crumbs.push({
      title: city,
      href: `/property/${countySlug}/${citySlug}`,
    });
  }

  if (propertyName) {
    crumbs.push({ title: propertyName, href: null });
  }

  const DownloadBtn = (row) => {
    return (
      <button className="btn btn-ghost btn-sm text-primary font-semibold">
        <DocIcon />
        OPEN FILE
      </button>
    );
  };
  const menuItems = [
    { name: "Property Details", path: "#overview" },
    { name: "Local Sold Prices", path: "#finances" },
    { name: "Local Amenities", path: "#credit-report" },
    { name: "Price Analysis", path: "#credit-report" },
  ];

  const ContactCard = () => {
    if (!developer) {
      return null;
    }

    return (
      <div className="card bg-white shadow-md w-full my-4">
        <div className="card-body">
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{developer.name}</p>

                <a
                  href={`/developers/${developer.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  More properties from this developer
                </a>
              </div>
              <Link href={`/developers/${developer.slug}`} passHref>
                <Image
                  src={developer.imageURL}
                  alt={developer.name}
                  width={125}
                  height={50}
                  className="h-12"
                />
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-outline flex-1"
              onClick={scrollToContactForm}
            >
              Request details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PropertySummary = () => {
    if (!properties[0] || typeof properties[0].priceFrom !== "number") {
      return null;
    }

    return (
      <div className="bg-white shadow-md w-full py-4 px-6 mb-8">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{properties[0].name}</span>
          <span className="text-gray-500 text-sm">
            {properties[0].address.shortAddress}
          </span>

          <span className="text-gray-500 text-sm">Guide Price</span>
          <span className="text-2xl font-bold text-primary">
            £{properties[0].priceFrom.toLocaleString()}
          </span>
          <div className="flex justify-end">
            <span className="text-gray-500 text-sm italic">
              Added on {new Date(properties[0].importDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const PropertyDetail = ({ icon, title, value }) => (
    <div className="flex flex-col items-center">
      {icon}
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-sm">{value}</p>
    </div>
  );

  const PropertyDetails = () => {
    const property = properties[0]; // Assuming this is where you access your API response
    let features = [];

    // Check if numberOfProperties exists and is greater than 0, then add it to the features list
    if (property?.numberOfProperties && property.numberOfProperties > 0) {
      features.push({
        icon: <HouseIcon />,
        title: `${property.numberOfProperties} Properties`,
      });
    }

    if (property?.propFeatures && property.propFeatures.length > 0) {
      features = [
        ...features,
        ...property.propFeatures.map((feature) => ({
          icon: featureIcons[feature],
          title: feature,
        })),
      ];
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-1">
        {/* Dynamically generated feature icons and titles displayed inline */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center md:items-start p-2 gap-2"
          >
            {feature.icon}{" "}
            {/* This will be null for the Number of Properties for now, replace it with the actual icon later */}
            <p className="text-sm font-semibold">{feature.title}</p>
          </div>
        ))}
      </div>
    );
  };

  const featureIcons = {
    "24 Hour Front Desk": <ProfileIcon />,
    "Air Conditioning": <Industry />,
    Balcony: <GymIcon />,
    Cinema: <CinemaIcon />,
    Lounge: <CinemaIcon />,
    "Concierge Service": <ConciergeIcon />,
    "Cycle Parking": <Download />,
    Gym: <GymIcon />,
    "Health Club": <ProfileIcon />,
    Parking: <ParkingIcon />,
    Sauna: <ProfileIcon />,
    Security: <ProfileIcon />,
    "Swimming Pool": <SwimmingIcon />,
  };
  console.log("Original Description:", properties[0]?.newDescription);

  const propertyDescription =
    !loading && properties?.[0]?.newDescription
      ? properties[0].newDescription.replace(/\n/g, "<br />")
      : null;

  console.log("Transformed Description:", propertyDescription);

  const TenureInformation = () => {
    return (
      <div className="bg-white shadow-md w-full my-4 p-4">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-1">
          Tenure: Leasehold
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-sm mt-1">GROUND RENT</p>
            <p>£800 per year</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-sm mt-1">ANNUAL SERVICE CHARGE</p>
            <p>£8323</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-sm mt-1">LENGTH OF LEASE</p>
            <p>991 years left</p>
          </div>
        </div>
      </div>
    );
  };

  const LocalAmenities = () => {
    return (
      <div className="card bg-white shadow-md w-full my-4">
        <div className="card-body">
          <h2 className="font-semibold text-xl mb-3">Local Amenities</h2>
          <div className="tabs mb-4 flex space-x-2">
            <span className="tab px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-200">
              Stations
            </span>
            <span className="tab px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-200">
              Schools
            </span>
          </div>
          <div className="amenities-content">
            <div className="amenity">
              <p className="text-sm font-semibold">Nearest Stations</p>
              <ul className="list-none p-0">
                <li className="flex justify-between my-2">
                  <span>Waterloo Station</span> <span>0.1 miles</span>
                </li>
                <li className="flex justify-between my-2">
                  <span>Waterloo East Station</span> <span>0.2 miles</span>
                </li>
                <li className="flex justify-between my-2">
                  <span>Embankment Station</span> <span>0.4 miles</span>
                </li>
                {/* Add more amenities here */}
              </ul>
            </div>
            {/* Add more content sections for other tabs if needed */}
          </div>
        </div>
      </div>
    );
  };

  const LocationCard = ({ title, lat, lng }) => {
    const googleMapsEmbedLink = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCpYcBokEmU0A1LDmmXP5KOM6K4BPpzwmc&q=${lat},${lng}`;

    return (
      <div className="card bg-white shadow-md w-full my-4">
        <div className="card-body">
          <h2 className="font-semibold text-xl mb-3">{title}</h2>
          <div
            className="map-container"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <iframe
              title="Google Maps"
              src={googleMapsEmbedLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  // Shows a list of property as a search page when it has several properties and property detail for a single property
  return (
    <div>
      {properties[0] && (
        <Head>
          <title>{seoTags.title}</title>
          <meta name="description" content={seoTags.description} />
          <meta name="keywords" content={seoTags.keywords} />
          <link
            rel="canonical"
            href={seoTags.metadataBase.href + seoTags.canonicalUrlRelative}
          />
          {/* Open Graph Tags */}
          <meta property="og:title" content={seoTags.openGraph.title} />
          <meta
            property="og:description"
            content={seoTags.openGraph.description}
          />
          <meta property="og:url" content={seoTags.openGraph.url} />
          <meta property="og:type" content={seoTags.openGraph.type} />
          <meta property="og:site_name" content={seoTags.openGraph.siteName} />
          {seoTags.openGraph.images &&
            seoTags.openGraph.images.map((image, index) => (
              <meta key={index} property="og:image" content={image.url} />
            ))}
          {/* Twitter Tags */}
          <meta name="twitter:card" content={seoTags.twitter.card} />
          <meta name="twitter:title" content={seoTags.twitter.title} />
          <meta
            name="twitter:description"
            content={seoTags.twitter.description}
          />
        </Head>
      )}
      {renderSchemaTags()}
      <Header />
      <div className="max-w-7xl mx-auto p-4 -mt-5">
        <div className="card-body">
          <div className="flex-grow">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto shadow-lg rounded-lg p-0 -mt-14">
        <div className="card-body">
          <div className="flex-grow">
            <div className="image-gallery" style={{ maxWidth: "900px" }}>
              <div className="h-full w-full md:h-auto md:w-auto">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {galleryImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Slide ${index}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <br></br>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {galleryImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Slide ${index}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        {/* Property Summary, Contact Card, and other details */}
        <PropertySummary />
        <PropertyDetails />
        <ContactCard />
        <div className="card bg-white shadow-md w-full my-4 p-4" id="overview">
          <h2 className="font-semibold text-xl mb-3 p-4">
            Property description
          </h2>
          <div
            className="mb-4 p-4"
            dangerouslySetInnerHTML={{ __html: propertyDescription }}
          ></div>
        </div>

        <LocationCard
          title="Location"
          lat={properties[0]?.location?.lat}
          lng={properties[0]?.location?.lng}
        />
        <div>
          {properties[0] && (
            <MortgageCalculator
              defaultLoanAmount={properties[0].priceFrom.toLocaleString()}
            />
          )}
          <div id="contact-form-marker"></div>
          <ContactForm />
        </div>
      </div>

      {/* Sidebar */}

      <Footer />
    </div>
  );
}

export default PropertyPage;

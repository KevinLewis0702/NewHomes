import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ResultsBar from "@/components/ResultsBar";
import FilterBar from "@/components/FilterBar";
import PlaceHolderImage from "@/public/placeholder.png";

const PropertyItem = ({ property }) => {
  // Helper function to truncate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description?.split(" ") || [];
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  // Function to create the property link
  const createPropertyLink = () => {
    const baseUrl = "/property";
    return `${baseUrl}/${property?.address?.area?.toLowerCase()}/${property?.address?.city?.toLowerCase()}/${property?.name
      ?.toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-full md:max-w-4xl">
      <div className="md:flex-shrink-0">
        <Link href={createPropertyLink()}>
          <div className="cursor-pointer">
            <Image
              className="h-48 w-full object-cover md:w-72"
              width={300}
              height={100}
              src={property?.featuredImage || "/placeholder.png"}
              blurDataURL={property?.featuredImage || "/placeholder.png"}
              placeholder="blur"
              alt={property?.name}
              quality={70}
            />
          </div>
        </Link>
      </div>
      <div className="p-8">
        <Link href={createPropertyLink()}>
          <div className="cursor-pointer">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold block mt-1">
              {property?.name}
            </div>
          </div>
        </Link>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          {property?.address?.shortAddress}
        </div>
        <p
          className="mt-2 text-gray-600"
          dangerouslySetInnerHTML={{
            __html: truncateDescription(property?.mainDescription, 25),
          }}
        ></p>
        <div className="mt-4">
          <span className="text-teal-600 text-md font-semibold">
            {property?.currency}
            £{property?.priceFrom?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600"> / Guide Price</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;

import connectMongo from "@/libs/mongoose";
import Property from "@/models/Property";

// Post Reqest for Insert a property
export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  if (!body.name || !body.address || !body.developerName) {
    return new Response(
      JSON.stringify({ error: "Missing required property information" }),
      { status: 400 }
    );
  }

  try {
    const existingProperty = await Property.findOne({ name: body.name });

    if (!existingProperty) {
      // Create a new property record
      const newProperty = await Property.create(body);
      return new Response(
        JSON.stringify({
          message: "Property added successfully",
          property: newProperty,
        })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Property already exists" }),
        { status: 409 }
      );
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// Get Reqest for fetching property data
// By the attributes of 'city', 'area', 'name' and also pagination
export async function GET(req) {
  await connectMongo();

  try {
    // Parse the request URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Extract query parameters
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 100;
    const city = (url.searchParams.get("city") || "").toLowerCase();
    const area = (url.searchParams.get("area") || "").toLowerCase();
    const name = (url.searchParams.get("name") || "").toLowerCase();
    const type = (url.searchParams.get("type") || "").toLowerCase();
    const bedCounts = (url.searchParams.get("bedCounts") || "").toLowerCase();
    const minPrice = (url.searchParams.get("minPrice") || "").toLowerCase();
    const maxPrice = (url.searchParams.get("maxPrice") || "").toLowerCase();
    const feature = (url.searchParams.get("feature") || "").toLowerCase();
    const sortBy = (url.searchParams.get("sortBy") || "").toLowerCase();
    const sortOrder = (url.searchParams.get("sortOrder") || "").toLowerCase();

    // Property Condition Query according to parameters requested
    const propertyConditions = [];
    if (city && city != "undefined")
      propertyConditions.push({
        "address.city": {
          $regex: new RegExp("^" + city.replaceAll("-", " "), "i"),
        },
      });
    if (area && area != "undefined")
      propertyConditions.push({
        "address.area": {
          $regex: new RegExp("^" + area.replaceAll("-", " "), "i"),
        },
      });
    if (name && name != "undefined")
      propertyConditions.push({
        name: {
          $regex: new RegExp("^" + name.replaceAll("-", " "), "i"),
        },
      });
    if (type && type != "all-types" && type != "undefined")
      propertyConditions.push({
        propertyTypes: {
          $elemMatch: { type: type },
        },
      });
    if (bedCounts && bedCounts != "undefined" && bedCounts != "any")
      propertyConditions.push({
        propertyTypes: {
          $elemMatch: { bedCounts: bedCounts },
        },
      });
    if (minPrice && minPrice != "undefined")
      propertyConditions.push({
        priceFrom: {
          $gte: minPrice,
        },
      });
    if (maxPrice && maxPrice != "undefined")
      propertyConditions.push({
        priceFrom: {
          $lte: maxPrice,
        },
      });
      if (feature && feature != "undefined") {
        const featureQuery = feature.replaceAll("-", " ");
        propertyConditions.push({
          propFeatures: {
            $regex: new RegExp("^" + featureQuery + "$", "i"), // Making the match case-insensitive
          },
        });
      }

    // Sort Options Query
    const sortOptions = {};
    if (sortBy == "price") sortOptions["priceFrom"] = sortOrder;

    const skip = (page - 1) * limit;
    const properties = await Property.find(
      propertyConditions.length == 0 ? {} : { $and: propertyConditions }
    )
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const total = await Property.find(
      propertyConditions.length == 0 ? {} : { $and: propertyConditions }
    ).count();
    return new Response(JSON.stringify({ properties, total }));
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET_PROPERTY_BY_SLUG(req) {
  await connectMongo();

  // Extract propertySlug from the URL
  const url = new URL(req.url);
  const propertySlug = decodeURIComponent(url.pathname.split("/").pop());

  try {
    const property = await Property.findOne({ slug: propertySlug });
    if (property) {
      return new Response(JSON.stringify(property));
    } else {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function GET_SPOTLIGHT_PROPERTIES(req) {
  await connectMongo();

  try {
    // Adjust the query to fetch spotlight properties as needed.
    // For example, this might fetch the latest 4 properties.
    const spotlightProperties = await Property.find({})
      .sort({ createdAt: -1 }) // Assuming you have a createdAt field for sorting.
      .limit(4); // Limit to 4 properties for spotlight.

    return new Response(JSON.stringify(spotlightProperties));
  } catch (e) {
    console.error("Error fetching spotlight properties:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

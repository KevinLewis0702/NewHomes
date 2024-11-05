import connectMongo from "@/libs/mongoose";
import Developer from "@/models/Developer";
import Property from "@/models/Property";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  // Update required field checks as per Developer schema
  if (
    !body.name ||
    !body.address.full ||
    !body.location.lat ||
    !body.location.lng
  ) {
    return new Response(
      JSON.stringify({ error: "Missing required developer information" }),
      { status: 400 }
    );
  }

  try {
    const existingDeveloper = await Developer.findOne({ name: body.name });

    if (!existingDeveloper) {
      const newDeveloper = await Developer.create(body);
      return new Response(
        JSON.stringify({
          message: "Developer added successfully",
          developer: newDeveloper,
        })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Developer already exists" }),
        { status: 409 }
      );
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const county = url.searchParams.get("county") || "";

  try {
    const cities = await Property.find(
      county == ""
        ? {}
        : {
            "address.area": {
              $regex: new RegExp("^" + county.replaceAll("-", " "), "i"),
            },
          }
    ).distinct("address.city");
    return new Response(JSON.stringify({ cities }));
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

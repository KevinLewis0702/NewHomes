import connectMongo from "@/libs/mongoose";
import Developer from "@/models/Developer";
import Property from "@/models/Property";

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url, `http://${req.headers.host}`);

  const slug = decodeURIComponent(url.pathname.split("/").pop());

  try {
    // Use the slug for querying the property
    const developer = await Developer.findOne({
      slug: new RegExp("^" + slug + "$", "i"),
    }).lean();
    const properties = developer
      ? await Property.find({
          developerId: developer.devCode,
        }).lean()
      : [];

    if (developer) {
      return new Response(JSON.stringify({ developer, properties }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Developer not found" }), {
        status: 404,
      });
    }
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}

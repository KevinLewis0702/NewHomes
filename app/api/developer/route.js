import connectMongo from "@/libs/mongoose";
import Developer from "@/models/Developer"; 

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  // Update required field checks as per Developer schema
  if (!body.name || !body.address.full || !body.location.lat || !body.location.lng) {
    return new Response(JSON.stringify({ error: "Missing required developer information" }), { status: 400 });
  }

  try {
    const existingDeveloper = await Developer.findOne({ name: body.name });

    if (!existingDeveloper) {
      const newDeveloper = await Developer.create(body);
      return new Response(JSON.stringify({ message: "Developer added successfully", developer: newDeveloper }));
    } else {
      return new Response(JSON.stringify({ message: "Developer already exists" }), { status: 409 });
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const developers = await Developer.find({}).skip(skip).limit(limit);
    const total = await Developer.countDocuments();
    return new Response(JSON.stringify({ developers, total }));
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function GET_DEVELOPER_BY_SLUG(req) {
  await connectMongo();

  const url = new URL(req.url);
  const developerSlug = decodeURIComponent(url.pathname.split('/').pop());

  try {
    const developer = await Developer.findOne({ slug: developerSlug });
    if (developer) {
      return new Response(JSON.stringify(developer));
    } else {
      return new Response(JSON.stringify({ message: "Developer not found" }), { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

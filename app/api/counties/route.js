import connectMongo from "@/libs/mongoose";
import Property from "@/models/Property";

export async function GET(req) {
  await connectMongo();

  try {
    const counties = await Property.distinct("address.area");
    return new Response(JSON.stringify({ counties }));
  } catch (e) {
    console.error("Error in GET request:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

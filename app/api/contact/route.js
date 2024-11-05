import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import { ServerClient } from 'postmark';

export async function POST(req) {
  await connectMongo();

  // Assuming req is of type NextApiRequest and supports the json method to parse the JSON body.
  // If req does not have a json method (e.g., when using Next.js Edge functions directly), you might need to parse the body from a Buffer.
  const body = await req.json();

  // Validate the request body has the necessary fields
  if (!body.email || !body.message) {
    return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
  }

  try {
    // Check for an existing lead
    const lead = await Lead.findOne({ email: body.email });

    // If no existing lead, create a new one
    if (!lead) {
      await Lead.create({ email: body.email });
      // Optionally, add logic here (e.g., sending a welcome email)
    }

    // Initialize the Postmark client
    const client = new ServerClient(process.env.POSTMARK_TOKEN);

    // Send an email with the details from the request
    await client.sendEmail({
      "From": "info@newbuildhomes.org",
      "To": "info@newbuildhomes.org", 
      "Subject": "New Contact Form Submission",
      "TextBody": `Email: ${body.email}\nMessage: ${body.message}`,
      "HtmlBody": `<strong>Email:</strong> ${body.email}<br><strong>Message:</strong> ${body.message}`
    });

    // Respond to the request indicating success
    return NextResponse.json({ message: 'Lead stored and email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

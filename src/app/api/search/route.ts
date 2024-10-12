import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const openai = new OpenAI({
<<<<<<< HEAD
    apiKey: process.env.OPENAI_API_KEY
=======
    apiKey: "-",
>>>>>>> 8e63b29 (api)
});

// Define a Zod schema for the expected response: an array of strings
const ExtractedTextSchema = z.object({
  key_points: z.array(z.string())
});

export async function POST(req: Request) {
  try {
    const { url, ...rest } = await req.json();

    // Fetch the HTML from the URL
    const html = await (await fetch(url)).text();

    // Parse the HTML into a DOM
    const dom = new JSDOM(html);

    // Extract all the text from the parsed document
    const textContent = dom.window.document.body.textContent || "";

    // Prepare the OpenAI GPT request with Zod parsing
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Extract meaningful information from the following text and return a list of key points." },
        { role: "user", content: `Extract key points from this text: ${textContent}` }
      ],
      response_format: zodResponseFormat(ExtractedTextSchema, "key_points"),
    });

    // Extract the structured response (list of strings)
    const keyPoints = completion.choices[0].message.parsed.key_points;

    // Return the structured data as a JSON response
    return new Response(JSON.stringify({ key_points: keyPoints }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err : any) {
    return new Response(JSON.stringify({ error: err.message, status: 400 }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
};

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an Exa instance
// const exa = new Exa(process.env.EXA_API_KEY);


// Define a Zod schema for the expected response: an array of strings
const ExtractedTextSchema = z.object({
  key_points: z.array(z.string())
});

const SummarySchema = z.object({
  data_privacy_summary: z.string(),
  user_rights_summary: z.string(),
  fees_summary: z.string(),
  additional_info: z.string()
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
    const key_points = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Extract meaningful information from the following text and return a list of key points." },
        { role: "user", content: `Extract key points from this text: ${textContent}` }
      ],
      response_format: zodResponseFormat(ExtractedTextSchema, "key_points"),
    });

    //Create summary of terms of service
    const summary = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a legal assistant specialized in summarizing terms of service documents." },
        { role: "user", content: `Summarize the following terms of service into three key areas: data privacy, user rights, fees and additional info. For each area, provide a brief summary.\n\nTerms of Service: ${textContent}` }
      ],
      response_format: zodResponseFormat(SummarySchema, "summary")
    });

    // Extract the structured response (list of strings)
    const keyPoints = key_points.choices[0].message.parsed?.key_points;

    const summary_json = {
      data_privacy_summary : summary.choices[0].message.parsed?.data_privacy_summary,
      user_rights_summary : summary.choices[0].message.parsed?.user_rights_summary,
      fees_summary : summary.choices[0].message.parsed?.fees_summary
    };

    // Get informaton on news related to databreaches and policy changes the company was involved in
    // const news = await exa.searchAndContents(
    //   "Here is an academic paper about a recent advancement in quantum computing",
    //   {
    //     type: "neural",
    //     numResults: 20,
    //     summary: {
    //       query: "What does this paper cover?"
    //     },
    //     category: "research paper",
    //     excludeDomains: ["en.wikipedia.org"],
    //     startPublishedDate: "2023-01-01"
    //   }
    // );

    // Return the structured data as a JSON response
    return new Response(JSON.stringify(
      { key_points: keyPoints, summary: summary_json, original_text: textContent }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err : any) {
    return new Response(JSON.stringify({ error: err.message, status: 400 }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
};

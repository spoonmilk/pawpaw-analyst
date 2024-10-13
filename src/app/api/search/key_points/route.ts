import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import get_text_from_url from "../helpers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


// Define a Zod schema for the expected response: an array of strings
const PointsSchema = z.object({
  positive_key_points: z.array(
    z.object({
      quotation: z.string(),
      explanation: z.string()
    })
  ),
  negative_key_points: z.array(
    z.object({
      quotation: z.string(),
      explanation: z.string()
    })
  ),
  suspicious_points: z.array(
    z.object({
      quotation: z.string(),
      explanation: z.string()
    })
  )
});

const SummarySchema = z.object({
  data_privacy_summary: z.string(),
  user_rights_summary: z.string(),
  fees_summary: z.string(),
  additional_info: z.string()
});

export async function POST(req: Request) {
  try {
    const { url, sarcasm, ...rest } = await req.json();

    const textContent = await get_text_from_url(url);

    // Prepare the OpenAI GPT request with Zod parsing
    const key_points = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a legal assistant specialized in extrating key points from terms of service documents." },
        { role: "user", content: `Extract positive key point quotations & explanations, negative key point quotations & explanations and suspicious point quotations & explanations from this text: \n\nTerms of Service: ${textContent}` }
      ],
      response_format: zodResponseFormat(PointsSchema, "key_points"),
    });

    //Create summary of terms of service
    const summary = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a legal assistant specialized in summarizing terms of service documents." },
        { role: "user", content: `Summarize the following terms of service into three key areas: data privacy, user rights, fees and additional info. For each area, provide a brief summary.\n\nTerms of Service: ${textContent}` }
      ],
      response_format: zodResponseFormat(SummarySchema, "summary")
    });

    // Extract the structured response (list of strings)
    const key_points_json = {
      positive_key_points: key_points.choices[0].message.parsed?.positive_key_points || [],
      negative_key_points: key_points.choices[0].message.parsed?.negative_key_points || [],
      suspicious_points: key_points.choices[0].message.parsed?.suspicious_points || []
    };    

    const summary_json = {
      data_privacy_summary : summary.choices[0].message.parsed?.data_privacy_summary || "",
      user_rights_summary : summary.choices[0].message.parsed?.user_rights_summary || "",
      fees_summary : summary.choices[0].message.parsed?.fees_summary || ""
    };

    // Return the structured data as a JSON response
    return new Response(JSON.stringify(
      { points: key_points_json, summary: summary_json}), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err : any) {
    return new Response(JSON.stringify({ error: err.message, status: 400 }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
};

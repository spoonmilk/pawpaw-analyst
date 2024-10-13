import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import get_text_from_url from "../helpers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ParsedTextSchema = z.object({
    text: z.string(),
  });

export async function POST(req: Request) {
    try {
        // Get the URL from the request
        const { url, ...res } = await req.json();

        // Fetch the parsed text from the URL's HTML
        const text = await get_text_from_url(url);
        
        const parsed_response = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "Without modifying the text." },
              { role: "user", content: `Parse the following text such that only the terms are extracted\n\n Text: ${text}` }
            ],
            response_format: zodResponseFormat(ParsedTextSchema, "text"),
          });
        
        const parsed_text = parsed_response.choices[0].message.parsed?.text || "";
        
        return new Response(JSON.stringify({ original_text: text }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

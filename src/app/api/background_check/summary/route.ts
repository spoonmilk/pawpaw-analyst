import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        
        const SummarySchema = z.object({
            summary: z.string(),
        });

        const { news, ...res } = await req.json();
        
        const summary = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
              { role: "system", content: "You are a professional unbiased journalist who specialized in tech news." },
              { role: "user", content: `Give me one summary of the following 10 news articles organized in a JSON object: ${news}` }
            ],
            response_format: zodResponseFormat(SummarySchema, "summary"),
          });
        
        const summary_text = summary.choices[0].message.parsed?.summary || "";

        return new Response(JSON.stringify({ summary: summary_text }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import get_text_from_url from "../helpers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ScoreSchema = z.object({
    score: z.number(),
    explanation: z.string()
  });

export async function POST(req: Request) {
    try {
        const { url, ...res } = await req.json();

        const textContent = await get_text_from_url(url);
        
        const score = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
              { role: "system", content: "You are an experienced lawyer that specializes on terms of service with the intent of ensuring end user privacy and fair data used is preserved" },
              { role: "user", content: `Given the following terms of service agreement for certain company, produce a score from 1 to 10 on how trustworthy the company is, and give an explanation for the for the score, \n\n Terms of Service: ${textContent}` }
            ],
            response_format: zodResponseFormat(ScoreSchema, "score"),
          });
        
        const score_json = {
            score : score.choices[0].message.parsed?.score,
            explanation : score.choices[0].message.parsed?.explanation || "",
        };

        return new Response(JSON.stringify(score_json), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
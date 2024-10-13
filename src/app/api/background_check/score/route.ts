import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const ScoreSchema = z.object({
    score: z.number(),
    explanation: z.string()
  });

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        
        const { news, ...res } = await req.json();
        
        const score = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
              { role: "system", content: "You are an experienced lawyer and tech inverstigator who determines how trustworthy tech companies are based on their past." },
              { role: "user", content: `Given the following 10 news articles on a company's past databreaches and terms of service violations, produce a score from 1 to 10 on how trustworthy the company is, and give an explanation for the for the score: ${news}` }
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
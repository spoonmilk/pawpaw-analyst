import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const { news, ...res } = await req.json();
        
        const key_points = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a professional unbiased journalist who specialized in tech news." },
              { role: "user", content: `Giveme  \n\nTerms of Service: ${textContent}` }
            ],
            response_format: zodResponseFormat(PointsSchema, "key_points"),
          });
        
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

import { z } from "zod";
import get_text_from_url from "../helpers";

export async function POST(req: Request) {
    try {
        // Get the URL from the request
        const { url, ...res } = await req.json();

        // Fetch the parsed text from the URL's HTML
        const text = await get_text_from_url(url);
        
        return new Response(JSON.stringify({ original_text: text }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
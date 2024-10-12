export async function POST(req: Request) {
    try {
        const { news, ...res } = await req.json();

        
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
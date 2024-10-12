import Exa from "exa-js"

const exa = new Exa(process.env.EXA_API_KEY);

export async function POST(req: Request) {
    try {
        const { url, ...res } = await req.json();
        const company_name = url.split("/")[2].split(".")[1];

        const news_databreaches = await exa.searchAndContents(
            `Recent data breaches involving ${company_name}`,
            {
                type: "auto",
                numResults: 5,
                summary: {
                query: "Who was affected by the breach?"
                },
                category: "news article",
                startPublishedDate: "2024-01-01"
            }
        );
        const news_toa_violations = await exa.searchAndContents(
            `Terms of service violations involving ${company_name}`,
            {
                type: "auto",
                numResults: 5,
                summary: {
                query: "What were the repercusions?"
                },
                category: "news article",
                startPublishedDate: "2022-01-01"
            }
        );
        const news = news_databreaches.results.concat(news_toa_violations.results);
        
        return new Response(JSON.stringify({ news : news }), {
            headers: { 'Content-Type': 'application/json' } 
        })
    } catch (err : any) {
        return new Response(JSON.stringify({ error: err.message, status: 400 }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
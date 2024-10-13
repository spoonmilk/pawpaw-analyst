import { Data } from "@/app/lib/types/Types";
import { motion } from "framer-motion";

export default function DisplayText({ data }: { data: Data | null }) {    
    const highlightWords = (text: string, quotes: string[]) => {
        let parts = [];
        quotes.forEach((quote, num_quote) => {
            const index = text.indexOf(quote);
            if (index !== -1) {
                parts.push(text.slice(0, index));
                parts.push(`<span class="font-bold">${quote}</span>`);
                text = text.slice(index + quote.length);
            } else {
                console.log("Could not find match??", quote);
            }

            let before = text.slice(0, index);
            parts.push(<span>{before}</span>);
            parts.push(<span id={`jump${num_quote}`} className="font-medium bg-yellow-200">{quote}</span>);
        });
        let lastIndex = text.indexOf(quotes[quotes.length - 1]);
        let last = text.slice(lastIndex + quotes[quotes.length - 1].length);
        parts.push(<span>{last}</span>);
        
        return parts;
    };
    
    return (
        <>
        {data?.original_text && (
            <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 1 }}
            className="mx-16 p-8 shadow-md bg-white rounded-lg text-black text-pretty w-[90%] mb-16">
                {highlightWords(data.original_text, data.key_points.points.negative_key_points.map(point => point.quotation))}
            </motion.div>
        )}
        </>
  )
}

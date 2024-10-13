import { Data } from "@/app/lib/types/Types";
import { motion } from "framer-motion";
import HoverPopup from "./HoverPopup";
import thumbs_up from "@/app/public/thumbs-up-svgrepo-com.svg";
import getMatchingPoints from "../utils/getMatchingPoints";

export default function DisplayText({ data }: { data: Data | null }) {

    const highlightWords = (data: Data) => {
        let parts = [];
        let remainingText = data.original_text;
        let cur_index = 0;
        const matching_points = getMatchingPoints(data);
        // console.log("Matching Points: ", matching_points);
        matching_points.forEach((match, num_match) => {
            parts.push(<span key={`text-${num_match}-before`}>{remainingText.slice(cur_index, match.index)}</span>); // Push text before the match
    
            parts.push(
                <HoverPopup 
                    key={`hover-${num_match}`}
                    classNames={{ wrapper: "", hover: "rounded-xl", parent: "" }}
                    hoverElement={<HoverElement data={data} num_quote={num_match} />}
                >
                    <span id={`jump${num_match}`} className="font-medium highlight_underline">{match.point.quotation}</span>
                </HoverPopup>
            );
    
            cur_index = match.index + match.point.quotation.length;
        });
    
        parts.push(<span key="text-after">{remainingText.slice(cur_index)}</span>); // Add remaining unmatched text at the end
        
        // console.log("Parts: ", parts);
        return parts;
    };

    const HoverElement = ({ data, num_quote }: { data: Data, num_quote: number }) => {
        const explanation = data.key_points.points.negative_key_points[num_quote].explanation;
        return (
            <>
                <p className="pb-1 border-b-2 border-gray-200 font-semibold">Gather Insight</p>
                <h2 className="font-light text-xl py-2">{explanation}</h2>
                <div className="pt-2 border-t-2 border-gray-200 font-semibold flex flex-row flex-wrap justify-between gap-1">
                    <div className="inline-flex items-center space-x-1">
                        <span className="flex items-center text-sm text-green-600">Positive Feedback</span>
                        <img src={thumbs_up.src} width={15} />
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-items-center">
                        <span className="text-sm text-red-600">Negative Feedback</span>
                        <img src={thumbs_up.src} width={15} className="rotate-180"/>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {data?.original_text && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 1 }}
                    className="mx-16 p-8 shadow-md rounded-lg bg-white text-black text-pretty w-[90%] mb-16 mt-3"
                >
                    {highlightWords(data)}
                </motion.div>
            )}
        </>
    );
}

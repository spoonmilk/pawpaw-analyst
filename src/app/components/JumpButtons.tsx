import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MatchingPoints, PointPair } from "@/app/lib/types/Types";

export default function JumpButtons({ matching_points }: { matching_points: MatchingPoints[] }) {
    const [current, setCurrent] = useState<number>(-1); // Set initial state to -1 for the top button
    const [scrollProgress, setScrollProgress] = useState<number>(0);

    const handleScroll = (index: number) => {
        setCurrent(index); // Set the currently active button
        const element = document.getElementById(`jump${index}`);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    // Function to scroll to the Summary box
    const scrollToSummary = () => {
        const element = document.getElementById("summaryBox");
        if (element) {
            setCurrent(-2); // Use -2 as a flag for the Summary button
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
            />

            <div className="p-4">
                {/* Circular Navigation Buttons */}
                <div className="fixed right-0 md:right-4 top-1/2 transform -translate-x-1.5 md:-translate-x-8 -translate-y-1/2 flex flex-col items-center space-y-3">
                    {/* Button to Scroll to Summary */}
                    <button
                        className={`w-8 h-4 rounded-lg transition-all duration-300 focus:outline-none ${
                            current === -2 
                                ? 'bg-blue-500 shadow-md scale-105' // Blue when selected
                                : 'bg-gray-300 hover:bg-gray-400'    // Grey hover when not selected
                        }`}
                        onClick={scrollToSummary}
                    />
                    {matching_points.map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-4 rounded-lg transition-all duration-300 focus:outline-none ${
                                current === index 
                                    ? 'bg-blue-500 shadow-md scale-105' // Blue when selected
                                    : 'bg-gray-300 hover:bg-gray-400'   // Grey hover when not selected
                            }`}
                            onClick={() => handleScroll(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

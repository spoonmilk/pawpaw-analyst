import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PointPair } from "@/app/lib/types/Types";

export default function JumpButtons({ key_points }: { key_points: PointPair[] }) {
    const [current, setCurrent] = useState<number>(0);
    const [scrollProgress, setScrollProgress] = useState<number>(0);

    const handleScroll = (index: number) => {
        setCurrent(index);
        const element = document.getElementById(`jump${index}`);
        if (element) {
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
                <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-3">
                    {key_points.map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-4 rounded-lg transition-all duration-300 focus:outline-none ${
                                current === index ? 'bg-blue-500 shadow-md scale-105' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onClick={() => handleScroll(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

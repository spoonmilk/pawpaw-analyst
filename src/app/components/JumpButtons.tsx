import { useState } from "react";
import { PointPair } from "@/app/lib/types/Types";

export default function JumpButtons({ key_points }: { key_points: PointPair[] }) {
    const [current, setCurrent] = useState<number>(0);

    const handleScroll = (index: number) => {
        setCurrent(index);
        const element = document.getElementById(`jump${index}`);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center", // This ensures the element is in the middle of the viewport
            });
        }
    };

    return (
        <div className="absolute top-0 left-0 flex items-center">
            <h1 className="text-xl">CURRENT: {current}</h1>
            
            {/* Circular Navigation Buttons */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                {key_points.map((_, index) => (
                    <button
                        key={index}
                        className={`w-5 h-5 rounded-full mb-2 cursor-pointer transition-colors duration-300 ${current === index ? 'bg-gray-300' : 'bg-gray-500'}`}
                        onClick={() => handleScroll(index)}
                    />
                ))}
            </div>

            {/* Previous and Next Links */}
            {current !== 0 && (
                <button 
                    onClick={() => handleScroll(current - 1)} 
                    className="absolute left-4 bottom-2 text-blue-600 bg-white border border-blue-600 rounded px-2 py-1 hover:bg-blue-100 transition"
                >
                    Prev
                </button>
            )}
            {current !== key_points.length - 1 && (
                <button 
                    onClick={() => handleScroll(current + 1)} 
                    className="absolute left-4 bottom-10 text-blue-600 bg-white border border-blue-600 rounded px-2 py-1 hover:bg-blue-100 transition"
                >
                    Next
                </button>
            )}
        </div>
    );
}

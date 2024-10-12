import { useState } from "react";

export default function JumpButtons({ key_points }: { key_points: string[] }) {
    const [current, setCurrent] = useState<number>(0);

    return (
        <div className="absolute top-0 left-0 flex items-center">
            <h1 className="text-xl">CURRENT: {current}</h1>
            {/* Circular Navigation Buttons */}
            <div className="absolute right-4 flex flex-col items-center">
                {key_points.map((_, index) => (
                    <a
                        key={index}
                        href={`#jump${index}`}
                        className={`w-5 h-5 rounded-full mb-2 cursor-pointer transition-colors duration-300 ${current === index ? 'bg-gray-300' : 'bg-gray-500'}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>

            {/* Previous and Next Links */}
            {current !== 0 && (
                <a href={`#jump${current - 1}`} className="absolute left-4 bottom-2 text-blue-600 bg-white border border-blue-600 rounded px-2 py-1 hover:bg-blue-100 transition">
                    Prev
                </a>
            )}
            {current !== key_points.length - 1 && (
                <a href={`#jump${current + 1}`} className="absolute left-4 bottom-10 text-blue-600 bg-white border border-blue-600 rounded px-2 py-1 hover:bg-blue-100 transition">
                    Next
                </a>
            )}
        </div>
    );
}

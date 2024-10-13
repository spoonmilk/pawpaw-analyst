import { useState } from 'react';
import { motion } from "framer-motion";

export default function Input({ value, setValue }: { value: string, setValue: (value: string) => void }) {


    return (
        <div className="flex flex-col w-full md:py-6 mx-1 md:px-4">
            <input 
                type="url" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="mt-1 py-1 px-2 block w-full border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500 my-1" 
                placeholder="https://example.com"
            />
       
            <motion.button
                type="submit"
                className="py-1 bg-white text-accent border-2 border-accent rounded-lg hover:bg-accent hover:text-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.85 }}
            >
            Submit
            </motion.button>
        </div>
    )
}
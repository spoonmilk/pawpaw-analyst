import { motion } from 'framer-motion';

export default function LoadingIcon({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center mt-4 space-x-2"> {/* Added space-x-2 for consistent spacing */}
          <motion.div
            className="h-3 w-3 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }} // Bouncing effect
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.div
            className="h-3 w-3 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }} // Bouncing effect
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-3 w-3 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }} // Bouncing effect
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      )}
    </>
  );
}

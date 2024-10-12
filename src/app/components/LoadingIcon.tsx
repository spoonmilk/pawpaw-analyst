import { motion } from 'framer-motion';

export default function LoadingIcon({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-5 w-5 mr-3 rounded-full border-4 border-t-4 border-white border-t-transparent"
          />
          <p className="text-white">Loading...</p>
        </div>
      )}
    </>
  );
}
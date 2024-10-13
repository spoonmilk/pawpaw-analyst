import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ClassNamesProps = {
  wrapper: string;
  parent: string;
  hover: string;
};

export default function HoverPopup({
  classNames = { wrapper: "", hover: "", parent: "" },
  hoverElement,
  children,
}: {
  classNames?: ClassNamesProps;
  hoverElement: JSX.Element;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative ${classNames.wrapper}`}>
      <div
        className={`hover-card-trigger ${classNames.parent}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {children}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`hover-card absolute bg-white border-gray-600 rounded p-4 shadow-supalarge z-50 ${classNames.hover}`}
          >
            {hoverElement}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

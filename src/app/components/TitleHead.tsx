import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import harold from "../public/haroldface.svg";

export default function TitleHead() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Image src={harold} alt="harold" className="h-60 w-auto" />
      <div>
        <motion.div
          className="rounded-lg px-4 py-4"
          transition={{ ease: easeInOut, duration: 0.5 }}
          whileHover={{
            scale: 1.02
          }}
        >
          <h1 className="text-lg/tight font-bold text-gray-900">PAWPAW</h1>
          <p className="my-0.5 text-gray-700">
            Privacy Analysis With Personality And Whimsy (PAWPAW) is a tool that
            allows users to analyze EULAs, SLAs, TOSs, and other legal documents
            to pinpoint how companies may be misusing your data.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import harold from "../public/haroldface.svg";

export default function TitleHead() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <Image src={harold} alt="harold" className="h-60 w-auto" priority />
      <div>
        <motion.div
          className="rounded-lg px-4 py-2 w-fit"
          transition={{ ease: easeInOut, duration: 0.5 }}
          whileHover={{
            scale: 1.02
          }}
        >
          <h1 className="text-lg/tight font-bold text-gray-900">PAWPAW</h1>
          <p className="my-0.5 text-gray-700 text-md" >
            Privacy Analysis With Personality And Whimsy (PAWPAW) is a tool that
            allows users to analyze EULAs, SLAs, TOSs, and other legal documents
            to pinpoint how companies may be misusing your data or pulling shady tactics 
            with your unknowing consent.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

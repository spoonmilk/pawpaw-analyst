'use client';

import { DisplayText, Input, LoadingIcon } from "@/app/components";
import { DisplaySummary } from "@/app/components";
import { useState, useEffect } from "react";
import { Data, KeyPoints } from "@/app/lib/types/Types";
import JumpButtons from "./components/JumpButtons";
import Image from "next/image";
import harold from "./public/haroldface.svg";
import { motion, useScroll, useSpring } from "framer-motion";
import TitleHead from "./components/TitleHead";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (value === "") {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
  
      const keyPointsPromise = fetch(`http://localhost:3000/api/search/key_points`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "url": value
        }),
        cache: "no-cache",
      });

      const originalTextPromise = fetch(`http://localhost:3000/api/search/original_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "url": value
        }),
        cache: "no-cache",
      });
      
      const [keyPointsResponse, originalTextResponse] = await Promise.all([keyPointsPromise, originalTextPromise]);
  
      if (!keyPointsResponse.ok || !originalTextResponse.ok) {
        setValue("");
        setError("An error occurred. Please try again later.");
        setLoading(false);
        return;
      }
      
      const keyPointsData = await keyPointsResponse.json() as KeyPoints;
      const originalTextData = await originalTextResponse.json() as { original_text: string };
  
      const data: Data = {
        key_points: keyPointsData,
        original_text: originalTextData.original_text,
      };
  
      setData(data);
      setValue("");
      setLoading(false);
    } catch (error) {
      setValue("")
      setError("An error occurred. Please try again later.");
      setLoading(false);
      console.error(error);
    }     
  }

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }}/>
      <main className="flex flex-col justify-start items-center w-full px-8 overflow-x-hidden">
        <div className="flex items-center justify-center py-4">
          <motion.div>
            <Image src={harold} alt="harold" className="h-60 w-auto"/>
          </motion.div>
          <div className="flex flex-col items-center justify-center">
          <h1>Welcome to PAWPAW!</h1>
            <p>
              <span className="block">Privacy Analyis With Personality And Whimsy (PAWPAW) is a tool that allows users</span>
              <span className="block">to analyze EULAs, SLAs, TOSs, and other legal documents to pinpoint</span>
              <span className="block"> how companies may be misusing your data. </span> 
            </p>
          </div>
        </div>

      <form className="w-[80%] max-w-[700px] py-8" onSubmit={(e) => onSubmit(e)}>
        <Input value={value} setValue={setValue} />
        {error ? 
          <motion.p 
            className="text-red-500 font-bold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
          : <></>
        }
      </form>

      <LoadingIcon isLoading={loading} />

      {data && <div id="summaryBox"><DisplaySummary key_points={data.key_points} /></div>}

      {data?.key_points ? 
        <div className="absolute top-0 right-0">
          <JumpButtons key_points={data.key_points.points.positive_key_points} />
        </div> 
        : <></>}
      <DisplayText data={data} />

    </main>
  )
}

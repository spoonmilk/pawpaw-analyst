'use client';

import { DisplayText, Input, LoadingIcon } from "@/app/components";
import { DisplaySummary } from "@/app/components";
import { useState, useEffect } from "react";
import { Data, KeyPoints, Score } from "@/app/lib/types/Types";
import JumpButtons from "./components/JumpButtons";
import { motion, useScroll, useSpring } from "framer-motion";
import TitleHead from "./components/TitleHead";
import SarcasmToggle from "./components/SarcasmToggle";
import ScoreTOS from "./components/ScoreTOS";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sarcasm, setSarcasm] = useState<boolean>(false);
  const [score, setScore] = useState<Score | null>(null);
  const scaleX = useSpring(0);
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.001,
  });

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
          "url": value,
          "sarcasm": sarcasm
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

      const scoreTOSPromise = fetch(`http://localhost:3000/api/search/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "url": value
        }),
        cache: "no-cache",
      });
      
      const [keyPointsResponse, originalTextResponse, scoreTOSResponse] = await Promise.all([keyPointsPromise, originalTextPromise, scoreTOSPromise]);
  
      if (!keyPointsResponse.ok || !originalTextResponse.ok || !scoreTOSResponse.ok) {
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

      const score_data: Score = await scoreTOSResponse.json() as Score;
  
      setData(data);
      setScore(score_data);
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
      <TitleHead />
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
        <ScoreTOS score={score?.score} />
    </main>
    </>
  )
}

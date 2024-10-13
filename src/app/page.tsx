'use client';

import { DisplayText, Input, LoadingIcon } from "@/app/components";
import { useState } from "react";
import { Data, KeyPoints } from "@/app/lib/types/Types";
import JumpButtons from "./components/JumpButtons";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();
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
      setValue("");
      console.error(error);
    }     
  }

  return (
    <main className="flex flex-col justify-start items-center w-full px-8 overflow-x-hidden">
      
      <div className="flex items-center justify-center py-4">
        <p>Pawpaw is the most best and awesome way of protecting your rights!</p>
      </div>

      <form className="w-[80%] max-w-[700px] py-8" onSubmit={(e) => onSubmit(e)}>
        <Input value={value} setValue={setValue} />
      </form>

      <LoadingIcon isLoading={loading} />

      {data?.key_points ? 
        <div className="absolute top-0 right-0">
          <JumpButtons key_points={data.key_points.points.positive_key_points} />
        </div> 
        : <></>}
      <DisplayText data={data} />

    </main>
  )
}

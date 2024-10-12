'use client';

import { Input } from "@/app/components"
import { useState } from "react"

export default function Home() {
  const [value, setValue] = useState<string>("")

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("https://localhost:3000/api/NACHOSAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "url": value
      }),
    })
    const data = await response.json();
    console.log(data);
  }

  return (
    <main className="flex flex-col justify-start items-center w-full pt-8">
      <div className="flex items-center justify-center py-4">
        <img src="/pawpaw.png"></img>
        <p>Pawpaw is the most best and awesome way of protecting your rights!</p>
      </div>
      
      <form className="max-w-[700px] min-w-[700px]" onSubmit={(e) => onSubmit(e)}>
        <Input value={value} setValue={setValue} />
      </form>
    </main>
  )
}
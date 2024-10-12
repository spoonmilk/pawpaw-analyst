import { Data } from "@/app/lib/types";

export default function DisplayText({ data }: { data: Data | null }) {
  return (
    <>
      {data?.orginal_text && (
        <div className="flex items-center justify-center mt-4">
          <p>{data.orginal_text}</p>
        </div>
      )}
    </>
  )
}
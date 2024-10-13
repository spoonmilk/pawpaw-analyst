import { KeyPoints } from "@/app/lib/types/Types";
import { motion } from "framer-motion";
import ScoreTOS from "./ScoreTOS";

export default function DisplaySummary({ key_points, score }: { key_points: KeyPoints | null, score: number | null | undefined }) {
  if (!key_points) return null;

  const { summary } = key_points;
  console.log(summary);

  return (
    <>
      {(key_points && summary) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 1 }}
          className="mx-10 p-8 shadow-md rounded-lg bg-white text-black text-pretty w-[90%] mb-1"
        >
          <div className="space-y-4 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Score</h3>
            <ScoreTOS score={score} />
            <SummarySection title="Data Privacy" content={summary.data_privacy_summary} />
            <SummarySection title="User Rights" content={summary.user_rights_summary} />
            <SummarySection title="Fees" content={summary.fees_summary} />
          </div>
        </motion.div>
      )}
    </>
  );
}

function SummarySection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function ScoreTOS({ score }: { score: number | null | undefined }) {
    return (score != null && score != undefined ?
        <div className="relative size-40">
            <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="50 100" stroke-linecap="round"></circle>

                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="1.5" stroke-dasharray={`${(score / 10) * 50} 100`} stroke-linecap="round"></circle>
            </svg>

            <div className="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">{score}</span>
                <span className="text-sm text-blue-600 dark:text-blue-500 block">Score</span>
            </div>
        </div>
        :
        <></>
    );
}
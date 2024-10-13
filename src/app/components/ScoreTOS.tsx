export default function ScoreTOS({ score }: { score: number | null | undefined }) {
    return (score != null && score != undefined ?
        < div className="radial-progress" style={{ "--value": score * 10 }
        } role="progressbar" >
            {score}
        </div >
        :
        <></>
    );
}
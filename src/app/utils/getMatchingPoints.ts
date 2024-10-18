import { Data, MatchingPoints, PointPair } from "../lib/types/Types";
import stringSimilarity from 'string-similarity';

const getMatchingPoints = (data: Data, similarityThreshold: number = 0.6) => {
    const matchingPoints = [] as MatchingPoints[];
    
    if (data?.key_points?.points?.negative_key_points === undefined) return [];

    data.key_points.points.negative_key_points.forEach((point) => {
        // Find the best match for the quote in the original text using string similarity
        const bestMatch = stringSimilarity.findBestMatch(point.quotation, data.original_text.split('.'));
        const bestMatchRating = bestMatch.bestMatch.rating;
        const bestMatchWord = bestMatch.bestMatch.target;

        // Find the starting index of the best match word in the original text
        const index = data.original_text.indexOf(bestMatchWord);

        // Check if the best match rating meets or exceeds the threshold and has a valid index
        if (bestMatchRating >= similarityThreshold && index !== -1) {
            matchingPoints.push({
                point,
                index
            });
        }
    });


    return matchingPoints;
  };

export default getMatchingPoints;
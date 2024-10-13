type PointPair = {
    quotation : string;
    explanation : string;
}

type KeyPoints = {
    points: { 
        positive_key_points : PointPair[],
        negative_key_points : PointPair[],
        suspicious_key_points : PointPair[], 
    },
    summary: { 
        data_privacy_summary: string,
        user_rights_summary: string,
        fees_summary: string,
    };
}

type Data = {
    key_points: KeyPoints,
    original_text: string
}

type MatchingPoints = {
    point: PointPair,
    index: number
  }

export type { MatchingPoints, KeyPoints, PointPair, Data }; 

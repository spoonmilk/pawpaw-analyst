type PointPair = {
    quotation : string;
    explanation : string;
}

type OriginalText = {
    original_text: string;
}

type KeyPoints = {
    key_points: {
        positive_key_points : PointPair[],
        negative_key_points : PointPair[],
        suspicious_key_points : PointPair[],
    } | null;
    summary: { 
        data_privacy_summary: string,
        user_rights_summary: string,
        fees_summary: string,
    } | null;
}

type Data = {
    key_points: KeyPoints;
    original_text: OriginalText
}

export type { OriginalText, KeyPoints, Data }; 

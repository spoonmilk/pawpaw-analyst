type Data = {
    key_points: string[];
    summary: { 
        data_privacy_summary: string,
        user_rights_summary: string,
        fees_summary: string,
    };
    orginal_text: string;
}

export default Data;
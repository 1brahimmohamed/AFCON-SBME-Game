import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/prediction";

export const getMatchPrediction = async (matchSlug: string) => {
    const res = await axios.get(`${API_URL}/match-predictions/${matchSlug}` );

    if (!res.data) {
        throw new Error("Failed to fetch prediction");
    }

    const { data } = res;

    return data;
};




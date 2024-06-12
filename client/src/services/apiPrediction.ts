import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/prediction`;

export const getMatchPrediction = async (matchSlug: string) => {
    try {
        const res = await axios.get(`${API_URL}/match-predictions/${matchSlug}`);

        const {data} = res.data;


        return {
            data,
            results: res.data.results,
        };

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
};




import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/prediction`;

export const getMatchPrediction = async (matchSlug: string) => {
    try {
        const res = await axios.get(`${API_URL}/match-predictions/${matchSlug}`);

        const {data} = res;


        return {
            "status": "success",
            data
        }

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
};




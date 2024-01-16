import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/match`;

export const getTodayMatches = async () => {

    const res = await axios.get(`${API_URL}/today`);

    if (!res.data) {
        throw new Error("Failed to fetch today matches");
    }

    const { data } = res;

    return data.data;
}

export const getAllMatches = async () => {

        const res = await axios.get(`${API_URL}`);

        if (!res.data) {
            throw new Error("Failed to fetch all matches");
        }

        const { data } = res;

        return data.data;
};

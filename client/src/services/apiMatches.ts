import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/match";

export const getTodayMatches = async () => {

    const res = await axios.get(`${API_URL}/today`);

    if (!res.data) {
        throw new Error("Failed to fetch today matches");
    }

    const { data } = res;

    return data.data;
}

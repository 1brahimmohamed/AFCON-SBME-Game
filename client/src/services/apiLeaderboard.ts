import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/game/leaderboard`;

export const getLeaderboard = async() => {
    const res = await axios.get(API_URL);

    if (!res.data) {
        throw new Error("Failed to fetch leaderboard");
    }

    const { data } = res;


    return data.data;
}

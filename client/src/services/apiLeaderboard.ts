import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/game/leaderboard";


export const getLeaderboard = async() => {
    const res = await axios.get(API_URL);

    if (!res.data) {
        throw new Error("Failed to fetch leaderboard");
    }

    const { data } = res;

    
    return data.data;
}
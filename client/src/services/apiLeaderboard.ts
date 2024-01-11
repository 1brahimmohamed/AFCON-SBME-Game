import axios from "axios";

const API_URL = "https://www.afcon.sbme.api.ibrahimmohamed.online/api/v1/game/leaderboard";


export const getLeaderboard = async() => {
    const res = await axios.get(API_URL);

    if (!res.data) {
        throw new Error("Failed to fetch leaderboard");
    }

    const { data } = res;


    return data.data;
}

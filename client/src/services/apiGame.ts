import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/game`;


export const predict = async (selectedTeam: string, matchId: string) => {

    try {
        const res = await axios.post(`${API_URL}/predict/${matchId}`, {
            selectedTeam: selectedTeam
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_auth')}`
            }
        });

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
}


export const getLeaderboard = async() => {
    const res = await axios.get(`${API_URL}/leaderboard`);

    if (!res.data) {
        throw new Error("Failed to fetch leaderboard");
    }

    const { data } = res;


    return data.data;
}


export const getScore = async () => {
    try {
        const res = await axios.get(`${API_URL}/my-score`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_auth')}`
            }
        });

        const {data} = res;

        return data.data;
    }
    catch (e: any) {
        return null
    }
};

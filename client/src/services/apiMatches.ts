import axios from "axios";

const API_URL = `https://afcon.sbme.api.ibrahimmohamed.online/api/v1/match`;

export const getTodayMatches = async () => {

    const res = await axios.get(`${API_URL}/today`);

    if (!res.data) {
        throw new Error("Failed to fetch today matches");
    }

    const { data } = res;

    return data.data;
}

import axios from "axios";

const API_URL = "https://www.afcon.sbme.api.ibrahimmohamed.online/api/v1/game";

export const predict = async (selectedTeam: string, matchId: string, token: string) => {

    const res = await axios.post(`${API_URL}/predict/${matchId}`, {
        selectedTeam: selectedTeam
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (!res.data) {
        throw new Error("Failed to predict");
    }

    const { data } = res;

    return data;
}

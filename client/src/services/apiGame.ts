import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/game";

export const predict = async (selectedTeam: string, matchId: string, token: string) => {

    console.log(selectedTeam, matchId);


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

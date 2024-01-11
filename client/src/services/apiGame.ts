import axios from "axios";

const API_URL = `https://afcon.sbme.api.ibrahimmohamed.online/api/v1/game`;

export const predict = async (selectedTeam: string, matchId: string, token: string) => {

    // replace bearer with Bearer
    token = token.replace("bearer", "Bearer");

    try {
        const res = await axios.post(`${API_URL}/predict/${matchId}`, {
            selectedTeam: selectedTeam
        }, {
            headers: {
                'Authorization': token
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

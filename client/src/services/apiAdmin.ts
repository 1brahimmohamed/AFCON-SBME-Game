import axios from "axios";


const API_URL = `${import.meta.env.VITE_BASE_URL}`;


export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_auth')}`
            }
        });

        const {data} = res;

        return data.data


    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
};

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

export const getUser = async (id: string) => {
    try {
        const res = await axios.get(`${API_URL}/user/${id}`, {
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
}

export const deleteUser = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_auth')}`
            }
        });


        return res

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
}

export const getMatch = async (id: string) => {
    try {
        const res = await axios.get(`${API_URL}/match/${id}`, {
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
}

export const updateWinner = async (id: string, winner: string) => {
    try {
        const res = await axios.patch(`${API_URL}/match/${id}`, {winner}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_auth')}`
            }
        });

        const {data} = res;

        return data

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
}

export const resolveScoreAfterMatch = async (id: string) => {
    try {
        const res = await axios.post(`${API_URL}/game/update-score/${id}`, {},{
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
}

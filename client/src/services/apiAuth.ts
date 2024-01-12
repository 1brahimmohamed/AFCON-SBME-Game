import axios from "axios";


const API_URL = `http://localhost:3000/api/v1/auth`;

export const login = async (formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/login`, {
            email: formData.email,
            password: formData.password,
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

export const register = async (formData: any) => {

    try {
        const res = await axios.post(`${API_URL}/signup`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            team: formData.country,
            year: formData.class,
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
};

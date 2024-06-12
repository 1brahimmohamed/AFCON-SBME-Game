import axios from "axios";


const API_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const login = async (formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/login`, {
            email: formData.email,
            password: formData.password,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
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

export const register = async (formData: any) => {

    try {
        const res = await axios.post(`${API_URL}/signup`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            team: formData.country,
            year: formData.class,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
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
};

export const forgotPassword = async (formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/forgot-password`, {
            email: formData.email,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            }
        });

        const {data} = res;

        return {
            "status": "success",
            data
        };

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message
        }
    }
};


export const resetPassword = async (formData: any, token: string) => {
    try {
        const res = await axios.patch(`${API_URL}/reset-password/${token}`, {
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            }
        });

        const {data} = res;

        return {
            "status": "success",
            data: data.data
        };

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
};

export const checkIfResetTokenExists = async (token: string) => {
    try {
        const res = await axios.get(`${API_URL}/check-reset-token/${token}`);

        const {data} = res;

        return {
            "status": "success",
            data: data.data
        };

    } catch (e: any) {
        return {
            "status": "error",
            "message": e.response.data.message,
        }
    }
};

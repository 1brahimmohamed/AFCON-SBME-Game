import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

export const login = async (formData: any) => {

    const res = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password
    });

    if (res.data.status === "fail") {
        console.log(res)
    }

    const { data } = res;

    return data;
}

export const register = async (formData: any) => {

    const res = await axios.post(`${API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        role: formData.role,
        team: formData.country
    });

    if (!res.data) {
        throw new Error("Failed to register");
    }

    const { data } = res;

    return data.data;
};

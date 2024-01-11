const API_URL = "http://localhost:3000/api/v1/auth";

export const login = async (formData: any) => {
    const requestOptions  = {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*", // allow request from all domains
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            'Accept': '*/*',
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),
    };

    try {
        const response : any = await fetch(`${API_URL}/login`, requestOptions);

        if (!response.ok) {
            console.log(response)
            return;
        }

        const {data} = response;

        return data.data;
    }
    catch (e) {
        console.log(e)
    }
}

export const register = async (formData: any) => {

    const requestOptions  = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*", // allow request from all domains
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            'Accept': '*/*',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            team: formData.country
        }),
    };


    try {
        const response : any = await fetch(`${API_URL}/register`, requestOptions);

        if (!response.ok) {
            console.log(response)
            return;
        }

        const {data} = response;

        return data.data;
    }
    catch (e) {
        console.log(e)
    }

};

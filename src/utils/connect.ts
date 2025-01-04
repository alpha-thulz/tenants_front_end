import axios from "axios";

const client = (base_url: string) => {
    const client = axios.create({
        baseURL: base_url || "https://api.tenants.wedela.co.za",
        // baseURL: base_url || "http://localhost:8080",
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    client.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        console.log(error);
        return error;
    });

    client.interceptors.response.use((response) => {
        const token = response.data.access_token;
        // const user_id = response.data.user_id;

        if (token) {
            localStorage.setItem("token", token);
        }
        // if (user_id) {
        //     localStorage.setItem("user_id", user_id);
        // }
        return response;
    }, (error) => {
        console.log(error);
        return error;
    });

    return client;
};

export default client;
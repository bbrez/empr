import axios from "axios";
import type { User } from "./model/user";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

type UserPayload = Pick<User, "email" | "password">;

const api_client = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

api_client.interceptors.request.use((config) => {
    const token = authStore.accessToken;

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
})

export const api = {
    user: {
        register(user: UserPayload) {
            return api_client.post("/users/register", user);
        },

        login(user: UserPayload) {
            return api_client.post("/users/login", user);
        },

        refreshToken(refreshToken: string) {
            return api_client.post("/users/refresh-token", {
                refresh_token: refreshToken,
            });
        }
    }
};
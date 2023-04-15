import axios from "axios";
import type { User } from "./model/user";

const api_client = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const api = {
    register(user: User) {
        return api_client.post("/register", user);
    }
};
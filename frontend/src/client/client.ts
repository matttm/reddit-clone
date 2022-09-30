import {Client} from "urql";
import {getToken} from "../services/authentication.service";


export const client = new Client({
    url: 'http://localhost:8080/query',
    fetchOptions: () => {
        const token = getToken();
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    }
});

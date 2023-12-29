import axios from "axios"
import { GET_PRODUCTS } from "../api_url"

export const getProducts = async () => {
    try {
        const response = await axios.get(`${GET_PRODUCTS}`);

        return response;
    } catch (error) {
        return error
    }
}


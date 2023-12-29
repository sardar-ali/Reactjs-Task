import axios from "axios"
import { GET_PRODUCTS, GET_PRODUCT_DETAIL } from "../api_url"

export const getProducts = async () => {
    try {
        const response = await axios.get(`${GET_PRODUCTS}`);

        return response;
    } catch (error) {
        return error
    }
}


export const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`${GET_PRODUCT_DETAIL}/${id}`);
        return response;
    } catch (error) {
        return error
    }
}


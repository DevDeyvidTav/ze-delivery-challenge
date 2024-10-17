import { fetchApi } from "@/src/api";

export async function getAllProducts() {
    const response = await fetchApi({
        method: "get",
        url: "/products",
    })
    console.log(response)
    return response.data
}
import { fetchApi } from "@/src/api";

export async function createNewTransaction() {
    const response = await fetchApi({
        method: "post",
        url: "/transactions",
    })
    return response.data
}
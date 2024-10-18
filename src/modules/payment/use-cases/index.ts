import { fetchApi } from "@/src/api";

export async function getPayments() {
    const response = await fetchApi({
        method: "get",
        url: "/payments",
    })
    return response.data
}
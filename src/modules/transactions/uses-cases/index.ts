import { fetchApi } from "@/src/api";

export async function createNewTransaction() {
    const response = await fetchApi({
        method: "post",
        url: "/transactions",
    })
    return response.data
}

export async function getTransactionById(id: string) {
    const response = await fetchApi({
        method: "get",
        url: `/transactions/${id}`,
    })
    return response.data
}


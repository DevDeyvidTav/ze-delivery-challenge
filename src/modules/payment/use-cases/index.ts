import { fetchApi } from "@/src/api";

export async function getPayments() {
  const response = await fetchApi({
    method: "get",
    url: "/payments",
  });
  return response.data;
}

export async function createPayment({
  transactionId,
  amount,
}: {
  transactionId: string;
  amount: number;
}) {
  const response = await fetchApi({
    method: "post",
    url: "/payments",
    body: {
      transactionId,
      amount,
    }
  });
  return response.data;
}

export async function getPaymentById(id: string) {
  const response = await fetchApi({
    method: "get",
    url: `/payments/${id}`,
  });
  return response.data;
}

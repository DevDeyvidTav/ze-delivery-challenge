import { Text, View, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getPaymentById } from "@/src/modules/payment/use-cases"; // Importe a função getPaymentById
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Biblioteca para ícones
import dayjs from "dayjs"; // Biblioteca para formatação de data

export default function PaymentDetailsScreen() {
  const [payment, setPayment] = useState<any>(null);
  const { id } = useLocalSearchParams(); // Recupera o id do pagamento via router
  const router = useRouter();

  async function fetchPaymentDetails() {
    const response = await getPaymentById(id as string);
    setPayment(response);
  }

  useEffect(() => {
    if (id) {
      fetchPaymentDetails();
    }
  }, [id]);

  if (!payment) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Carregando detalhes do pagamento...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Controla o estilo da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View className="flex-row items-center bg-black pt-10 pb-4 px-4">
        <TouchableOpacity onPress={() => router.push("/payments")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1 text-center">Detalhes do Pagamento</Text>
      </View>

      {/* Conteúdo principal */}
      <View className="px-4 mt-6">
        <View className="bg-white rounded-lg p-4 shadow-md">
          <Text className="text-lg font-bold">ID do Pagamento</Text>
          <Text className="text-gray-500 mb-4">{payment.id}</Text>

          <Text className="text-lg font-bold">Data do Pagamento</Text>
          <Text className="text-gray-500 mb-4">
            {dayjs(payment.paymentDate).format("DD/MM/YYYY HH:mm")}
          </Text>

          <Text className="text-lg font-bold">ID da Transação</Text>
          <Text className="text-gray-500 mb-4">{payment.transactionId}</Text>

          <Text className="text-lg font-bold">Valor</Text>
          <Text className="text-gray-500 mb-4">R$ {payment.amount.toFixed(2)}</Text>

          <Text className="text-lg font-bold">Status</Text>
          <Text
            className={`text-lg font-bold ${
              payment.status === "PAID" ? "text-green-500" : "text-red-500"
            }`}
          >
            {payment.status === "PAID" ? "Pago" : "Pendente"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

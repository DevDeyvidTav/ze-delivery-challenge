import { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { getPayments } from "@/src/modules/payment/use-cases";
import { useRouter } from "expo-router";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  async function fetchPayments() {
    const response = await getPayments();
    setPayments(response as any);
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderPayment = ({ item }: any) => (
    <TouchableOpacity 
      onPress={() => router.push(`/payment/${item.id}`)} // Redireciona para a tela de detalhes do pagamento
      className="bg-white rounded-lg shadow p-4 mb-4"
    >
      <View className="flex-row justify-between">
        <Text className="text-lg font-bold text-gray-800">Transação: {item.transactionId}</Text>
        <Text className="text-xs font-semibold text-green-500">
          {item.status === "PAID" ? "PAGO" : "PENDENTE"}
        </Text>
      </View>
      <Text className="text-sm text-gray-500 mt-1">
        Data: {new Date(item.paymentDate).toLocaleDateString("pt-BR")}
      </Text>
      <Text className="text-xl font-bold text-yellow-500 mt-2">R$ {item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }} className="flex-1 px-4 bg-zinc-200">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View className="mt-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Histórico</Text>
        <FlatList
          className="mb-20"
          data={payments}
          keyExtractor={(item: any) => item.id}
          renderItem={renderPayment}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

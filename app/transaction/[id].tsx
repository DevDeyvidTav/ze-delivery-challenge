import { Text, TouchableOpacity, View, TextInput, SafeAreaView, StatusBar, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { getTransactionById } from "@/src/modules/transactions/uses-cases";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Biblioteca para ícones

export default function CheckoutScreen() {
  const [transaction, setTransaction] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const { id } = useLocalSearchParams(); // Recupera o id da transação via router
  console.log(id);
  const router = useRouter();

  async function fetchTransactionDetails() {
    const response = await getTransactionById(id as string);
    setTransaction(response);
  }
  console.log(transaction);
  useEffect(() => {
    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  const handlePayment = () => {
    // Lógica de pagamento ou navegação após o pagamento
    console.log("Valor pago:", paymentAmount);
    console.log("ID da transação:", transaction?.id);
    // Exemplo: redirecionar para a tela de sucesso ou home
  };

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Carregando detalhes da transação...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Controla o estilo da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View className="flex-row items-center bg-black pt-10 pb-4 px-4">
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1 text-center">Detalhes da Compra</Text>
      </View>

      {/* Conteúdo principal */}
      <View className="px-4">
        <FlatList
        className="max-h-[70%] mt-4"
          data={transaction.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg">
              <Image resizeMode="contain" source={{ uri: item.thumb }} style={{ width: 50, height: 50 }} />
              <View className="flex-1 mx-4">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-500">Quantidade: {item.quantity}</Text>
                <Text className="text-gray-500">Preço: R$ {item.price.toFixed(2)}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View className="mb-4 mt-2">
          <Text className="text-lg">Total: R$ {transaction.products.reduce((total: number, product: any) => total + (product.price * product.quantity), 0).toFixed(2)}</Text>
        </View>

        <View className="mb-4">
          <TextInput
            value={paymentAmount}
            onChangeText={setPaymentAmount}
            placeholder="Digite o valor que vai pagar"
            keyboardType="numeric"
            className="bg-white rounded-lg p-4 text-lg"
          />
        </View>

        <TouchableOpacity 
          onPress={handlePayment} 
          className="bg-black rounded-lg mt-2 h-12 w-full mx-auto items-center justify-center active:bg-gray-800"
        >
          <Text className="text-yellow-500 text-lg font-bold">Finalizar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

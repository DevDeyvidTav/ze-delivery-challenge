import { Text, TouchableOpacity, View, TextInput, SafeAreaView, StatusBar, FlatList, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import { getTransactionById } from "@/src/modules/transactions/uses-cases";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Biblioteca para ícones
import { createPayment } from "@/src/modules/payment/use-cases"; // Importe a função createPayment

export default function CheckoutScreen() {
  const [transaction, setTransaction] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null); // Estado para armazenar o status do pagamento
  const { id } = useLocalSearchParams(); // Recupera o id da transação via router
  const router = useRouter();

  async function fetchTransactionDetails() {
    const response = await getTransactionById(id as string);
    setTransaction(response);
  }

  useEffect(() => {
    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  const handlePayment = async () => {
    try {
      const response: any = await createPayment({
        transactionId: transaction?.id,
        amount: parseFloat(paymentAmount), // Converte o valor para número
      });

      // Atualiza o estado do pagamento com o status da resposta
      setPaymentStatus(response.status);

      // Exibe uma mensagem para o usuário com base no status do pagamento
      if (response.status === "PAID") {
        Alert.alert("Pagamento Aprovado", "O pagamento foi aprovado com sucesso!");
      } else if (response.status === "REJECTED") {
        Alert.alert("Pagamento Rejeitado", "O pagamento foi rejeitado. Por favor, tente novamente.");
      }
      
      // Você pode adicionar navegação ou feedback adicional aqui
    } catch (error) {
      console.error("Erro ao realizar o pagamento:", error);
      Alert.alert("Erro", "Ocorreu um erro ao processar o pagamento. Tente novamente mais tarde.");
    }
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

        {/* Mensagem de status opcional */}
        {paymentStatus && (
          <View className="mt-4">
            <Text className={`text-lg font-bold ${paymentStatus === 'APPROVED' ? 'text-green-500' : 'text-red-500'}`}>
              {paymentStatus === 'PAID' ? "Pagamento aprovado!" : "Pagamento rejeitado"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

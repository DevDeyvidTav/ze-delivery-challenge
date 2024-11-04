import { Text, TouchableOpacity, View, FlatList, SafeAreaView, StatusBar } from "react-native";
import { ProductView } from "../../products/components/product-view";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/use-cases";
import { createNewTransaction } from "../../transactions/uses-cases";
import { useRouter } from "expo-router";

export function HomeScreen() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await getAllProducts();
    setProducts(response as any);
    return response;
  }

    const router = useRouter()
  async function createTransaction() {
    const response: any = await createNewTransaction();
    if (response) {
      router.push(`/transaction/${response.id}`);
    }

    return null;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }} className="flex-1 px-4 bg-gray-100">
      {/* Controla o estilo da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View className="mb-4">
        <TouchableOpacity 
          onPress={createTransaction} 
          className="bg-black rounded-lg mt-2 h-12 w-full mx-auto items-center justify-center active:bg-gray-800"
        >
          <Text className="text-yellow-500 text-lg font-bold">Destrancar Porta</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ProductView product={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

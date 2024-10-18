import { Text, TouchableOpacity, View, FlatList, SafeAreaView, StatusBar } from "react-native";
import { ProductView } from "../../products/components/product-view";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/use-cases";
import { createNewTransaction } from "../../transactions/uses-cases";

export function HomeScreen() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await getAllProducts();
    setProducts(response as any);
    return response;
  }

  async function createTransaction() {
    const response = await createNewTransaction();
    console.log(response);
    return response;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    
    <SafeAreaView  style={{ paddingTop: StatusBar.currentHeight }} className="flex-1 px-4 bg-zinc-200">
      {/* Controla o estilo da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <TouchableOpacity onPress={createTransaction} className="bg-zinc-900 rounded-lg mt-2  h-10 w-full mx-auto items-center justify-center">
        <Text className="text-yellow-500">Destrancar Porta</Text>
      </TouchableOpacity>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <ProductView product={item} />}
      />
    </SafeAreaView>
  );
}

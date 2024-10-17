import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { ProductView } from "../../products/components/product-view";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/components/use-cases";

export function HomeScreen() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await getAllProducts();

    setProducts(response as any);

    return response;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View className="flex-1 p-4 bg-zinc-200">
      <TouchableOpacity className="bg-zinc-900 rounded-lg h-10 w-full mx-auto items-center justify-center">
        <Text className="text-yellow-500">Destrancar Porta</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        className=""
        data={products}
        renderItem={({ item }) => <ProductView product={item} />}
      />
    </View>
  );
}

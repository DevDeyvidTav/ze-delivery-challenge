import { Image, Text, View } from "react-native";

interface Product {
    name: string;
    id: number;
    price: number;
    thumb: string;
}

interface ProductViewProps {
    product: Product;
}

export function ProductView({ product }: ProductViewProps) {
    return (
        <View className="w-full flex-row gap-4 p-4 mt-4 items-center rounded-lg ml-[1px] bg-white shadow-md">
            <View className="w-[35%] h-[120px] items-center justify-center">
                <Image 
                    source={{ uri: product.thumb }} 
                    resizeMode="contain" 
                    className="w-full h-full rounded-md" 
                />
            </View>
            <View className="flex-1 justify-center">
                <Text className="text-lg font-semibold text-gray-800" numberOfLines={2}>
                    {product.name}
                </Text>
                <Text className="text-xl font-bold text-yellow-600 mt-2">
                    R$ {String(product.price).replace('.', ',')}
                </Text>
            </View>
        </View>
    );
}

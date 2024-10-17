import { Image, Text, View } from "react-native";

interface Product {
    name: string;
    id: number;
    price: number;
    thumb: string;
}

interface ProductViewProps{
    product: Product
}

export function ProductView({ product }: ProductViewProps) {
    return (
        <View className="w-full flex-row gap-4 mt-4 h-[150px] ml-[1px] items-center rounded-lg bg-zinc-300">
            <Image  source={{ uri: product.thumb }} height={80} resizeMode="contain" className="w-[30%]" />
            <View className=" justify-center ">
                <Text className="w-40">{product.name}</Text>
                <Text className="text-yellow-600">R$ {String(product.price).replace('.', ',')}</Text>
            </View>
        </View>
    )
}
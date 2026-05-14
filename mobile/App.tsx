import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { products } from "../src/data/mock";
import { bestOffer, totalPrice } from "../src/lib/scoring";
import { sellers } from "../src/data/mock";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-ink">
      <ScrollView className="px-5">
        <View className="py-8">
          <Text className="text-sm font-semibold uppercase tracking-widest text-volt">KitRadar mobile</Text>
          <Text className="mt-3 text-4xl font-black text-white">Best football shirt deals</Text>
          <Text className="mt-3 text-base leading-7 text-steel">Expo shell for favorites, alerts, push notifications and marketplace comparison.</Text>
        </View>
        {products.map((product) => {
          const offer = bestOffer(product, sellers);
          return (
            <View key={product.id} className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <Text className="text-xl font-bold text-white">{product.title}</Text>
              <Text className="mt-1 text-steel">{product.club} · {product.season} · {product.version}</Text>
              <View className="mt-5 flex-row justify-between">
                <View><Text className="text-xs text-steel">Quality</Text><Text className="text-2xl font-black text-volt">{product.qualityScore}</Text></View>
                <View><Text className="text-xs text-steel">From</Text><Text className="text-2xl font-black text-white">€{totalPrice(offer).toFixed(2)}</Text></View>
              </View>
              <TouchableOpacity className="mt-5 rounded-full bg-volt px-5 py-4">
                <Text className="text-center font-bold text-ink">Create price alert</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

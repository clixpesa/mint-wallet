import { Text, View } from "@/ui"

export default function InvestScreen() {
  return (
    <View flex={1} justify="center" items="center">
      <Text>Invest In Stocks and Crypto</Text>

      <Text fontSize="$sm" color="$neutral2">Powered by CoinGecko and Polygon IO</Text>
    </View>
  )
}

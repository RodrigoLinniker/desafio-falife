import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";

export function Header() {
  return (
    <View className="h-14 bg-stroke  w-full flex flex-row  items-center justify-between px-4 border-b border-gray-100/10">
      <Text fontSize={"$lg"} fontWeight={"$bold"} color="$blue500">
        DESAFIO REACT FALIFE
      </Text>
    </View>
  );
}

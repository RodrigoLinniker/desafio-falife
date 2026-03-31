import { Spinner } from "@gluestack-ui/themed";
import { View } from "react-native";

export function Loading() {
  return (
    <View className={"flex-1 justify-center items-center"}>
      <Spinner />
    </View>
  );
}

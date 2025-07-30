import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import PackageJson from "@/package.json";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text>Package Json Version:</Text>
      <Text>{PackageJson.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import CustomModal from "@/components/CustomModal";
import CreateTeamForm from "@/components/CreateTeamForm";

export default function TeamsScreen() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams</Text>
      <Pressable onPress={() => setOpenModal(true)}>
        <Text>Open</Text>
      </Pressable>
      <CustomModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        title="Modal"
      >
        <CreateTeamForm />
      </CustomModal>
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

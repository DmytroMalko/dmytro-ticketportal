import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useState } from "react";
import CustomModal from "@/components/CustomModal";
import CreateTeamForm from "@/components/CreateTeamForm";
import useSportsStore from "@/store/store";
import { TeamCard } from "@/components/TeamCard";

export default function TeamsScreen() {
  const [openModal, setOpenModal] = useState(false);

  const teams = useSportsStore((state) => state.teams);

  return (
    <View style={styles.container}>
      <Pressable style={styles.blueBtn} onPress={() => setOpenModal(true)}>
        <Text>Open</Text>
      </Pressable>

      <Text style={styles.title}>Teams</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeamCard team={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
  blueBtn: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
});

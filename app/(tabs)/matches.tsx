import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useState } from "react";
import CustomModal from "@/components/CustomModal";
import useSportsStore from "@/store/store";
import { TeamCard } from "@/components/TeamCard";
import CreateMatchForm from "@/components/CreateMatchForm";
import { MatchCard } from "@/components/MatchCard";
import { Match } from "@/types/globalTypes";
import EditMatchForm from "@/components/EditMatchForm";

interface MatchState {
  match: null | Match;
  open: boolean;
}

export default function MatchesScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState<MatchState>({
    match: null,
    open: false,
  });

  const matches = useSportsStore((state) => state.matches);

  const handleItemClick = (match: Match) => {
    if (!match) return;
    setOpenEditModal({ match: match, open: true });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.blueBtn} onPress={() => setOpenModal(true)}>
        <Text>Open</Text>
      </Pressable>

      <Text style={styles.title}>Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleItemClick(item)}>
            <MatchCard match={item} />
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <CustomModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        title="Modal"
      >
        <CreateMatchForm />
      </CustomModal>

      <CustomModal
        visible={Boolean(openEditModal.open && openEditModal.match)}
        onClose={() => setOpenEditModal({ match: null, open: false })}
        title="Modal Edit"
      >
        <EditMatchForm match={openEditModal.match} />
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

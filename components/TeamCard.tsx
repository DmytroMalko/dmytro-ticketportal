import useSportsStore from "@/store/store";
import { cardStyles } from "@/styles/cardStyles";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    logo?: string;
    players: string[];
  };
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { id, name, logo, players } = team;

  const removeTeam = useSportsStore((state) => state.removeTeam);

  return (
    <View style={cardStyles.card}>
      {logo && <Image source={{ uri: logo }} style={cardStyles.logo} />}
      <View>
        <Text style={cardStyles.teamName}>{name}</Text>
        <Text>{players.length} Players</Text>
      </View>
      <TouchableOpacity
        style={cardStyles.deleteButton}
        onPress={() => removeTeam(id)}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

import React from "react";
import { View, Text, Image } from "react-native";
import useSportsStore from "@/store/store";
import { Match } from "@/types/globalTypes";
import { matchCard } from "@/styles/matchCardStyles";

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { teamA: teamAId, teamB: teamBId, date, score } = match;

  const teams = useSportsStore((state) => state.teams);
  const teamA = teams.find((t) => t.id === teamAId);
  const teamB = teams.find((t) => t.id === teamBId);

  if (!teamA || !teamB) return null;

  const formattedDate = new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <View style={matchCard.card}>
      <View style={matchCard.team}>
        {teamA.logo && (
          <Image source={{ uri: teamA.logo }} style={matchCard.logo} />
        )}
        <Text style={matchCard.teamName}>{teamA.name}</Text>
      </View>

      <View style={matchCard.center}>
        {score ? (
          <Text style={matchCard.score}>{score}</Text>
        ) : (
          <Text style={matchCard.date}>{formattedDate}</Text>
        )}
      </View>

      <View style={matchCard.team}>
        {teamB.logo && (
          <Image source={{ uri: teamB.logo }} style={matchCard.logo} />
        )}
        <Text style={matchCard.teamName}>{teamB.name}</Text>
      </View>
    </View>
  );
};

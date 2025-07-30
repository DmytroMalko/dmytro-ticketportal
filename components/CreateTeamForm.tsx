import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSportsStore from "@/store/store";
import uuid from "react-native-uuid";
import { teamFormStyles } from "@/styles/formStyles";

const teamSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  logo: z.string().optional(),
  players: z
    .array(z.string().min(2, "Player name must be at least 2 characters"))
    .min(1, "At least one player required"),
});

type TeamFormData = z.infer<typeof teamSchema>;

export default function TeamForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      logo: "",
      players: [""],
    },
  });
  const addTeam = useSportsStore((state) => state.addTeam);

  const players = watch("players") || [];

  const addPlayer = () => {
    setValue("players", [...players, ""]);
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setValue("players", newPlayers);
  };

  // TODO: Add validation of duplicates teams
  const onSubmit = (data: TeamFormData) => {
    const filteredPlayers = data.players.filter((p) => p.trim() !== "");
    if (filteredPlayers.length === 0) {
      alert("Add at least one player");
      return;
    }

    const uniqueId = uuid.v4();
    const updatedData = {
      ...data,
      id: uniqueId,
      players: filteredPlayers,
    };

    addTeam(updatedData);
  };

  return (
    <View style={teamFormStyles.container}>
      <Text>Team Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            style={teamFormStyles.input}
            placeholder="Team Name"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.name && (
        <Text style={teamFormStyles.errorText}>{errors.name.message}</Text>
      )}

      <Text>Logo URL</Text>
      <Controller
        control={control}
        name="logo"
        render={({ field }) => (
          <TextInput
            style={teamFormStyles.input}
            placeholder="Logo URL"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.logo && (
        <Text style={teamFormStyles.errorText}>{errors.logo.message}</Text>
      )}

      <Text>Players</Text>
      {players.map((player, index) => (
        <View key={index} style={teamFormStyles.playerRow}>
          <View>
            <Controller
              control={control}
              name={`players.${index}` as const}
              render={({ field }) => (
                <TextInput
                  style={teamFormStyles.playerInput}
                  placeholder={`Player #${index + 1}`}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            {errors.players?.[index] && (
              <Text style={teamFormStyles.errorTextSmall}>
                {errors.players[index]?.message}
              </Text>
            )}
          </View>
          <Pressable
            onPress={() => removePlayer(index)}
            style={({ pressed }) => [
              teamFormStyles.removeButton,
              pressed && teamFormStyles.removeButtonPressed,
            ]}
          >
            <Text style={teamFormStyles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      ))}

      <Pressable
        onPress={addPlayer}
        style={({ pressed }) => [
          teamFormStyles.addButton,
          pressed && teamFormStyles.addButtonPressed,
        ]}
      >
        <Text style={teamFormStyles.buttonText}>Add Player</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={({ pressed }) => [
          teamFormStyles.submitButton,
          pressed && teamFormStyles.submitButtonPressed,
        ]}
      >
        <Text style={teamFormStyles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

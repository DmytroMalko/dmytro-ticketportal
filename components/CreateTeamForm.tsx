import React from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSportsStore from "@/store/store";
import uuid from "react-native-uuid";

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
  const teams = useSportsStore((state) => state.teams);

  const players = watch("players") || [];

  const addPlayer = () => {
    setValue("players", [...players, ""]);
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setValue("players", newPlayers);
  };

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
    <View style={styles.container}>
      <Text>Team Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Team Name"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Text>Logo URL</Text>
      <Controller
        control={control}
        name="logo"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Logo URL"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.logo && (
        <Text style={styles.errorText}>{errors.logo.message}</Text>
      )}

      <Text>Players</Text>
      {players.map((player, index) => (
        <View key={index} style={styles.playerRow}>
          <View>
            <Controller
              control={control}
              name={`players.${index}` as const}
              render={({ field }) => (
                <TextInput
                  style={styles.playerInput}
                  placeholder={`Player #${index + 1}`}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            {errors.players?.[index] && (
              <Text style={styles.errorTextSmall}>
                {errors.players[index]?.message}
              </Text>
            )}
          </View>
          <Pressable
            onPress={() => removePlayer(index)}
            style={({ pressed }) => [
              styles.removeButton,
              pressed && styles.removeButtonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      ))}

      <Pressable
        onPress={addPlayer}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Add Player</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.submitButtonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorTextSmall: {
    color: "red",
    marginLeft: 10,
    maxWidth: 170,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  playerInput: {
    borderWidth: 1,
    width: 170,
    marginRight: 10,
    padding: 8,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: "#ff6666",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeButtonPressed: {
    backgroundColor: "#ff4d4d",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonPressed: {
    backgroundColor: "#4CAF50AA",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonPressed: {
    backgroundColor: "#2196F3AA",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

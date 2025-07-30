import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { teamFormStyles } from "@/styles/formStyles";
import { Picker } from "@react-native-picker/picker";
import useSportsStore from "@/store/store";
import uuid from "react-native-uuid";

type FormData = {
  teamA: string;
  teamB: string;
  date: Date;
};

export default function MatchForm() {
  // validation could be added
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      teamA: "",
      teamB: "",
      date: new Date(),
    },
  });

  const teams = useSportsStore((state) => state.teams);
  const matches = useSportsStore((state) => state.matches);
  const addMatch = useSportsStore((state) => state.addMatch);

  console.log("matches :>> ", matches);
  const teamA = watch("teamA");
  const teamB = watch("teamB");
  const selectedDate = watch("date");

  // TODO: Add validation of duplicates matches
  const onSubmit = (data: FormData) => {
    const uniqueId = uuid.v4();
    const updatedData = {
      ...data,
      id: uniqueId,
    };

    addMatch(updatedData);
  };

  return (
    <View style={{ padding: 20 }}>
      {teams && teams.length <= 1 ? (
        <Text>Not enought teams created</Text>
      ) : (
        <>
          <Text style={{ marginTop: 20 }}>Match Date</Text>
          <Controller
            control={control}
            name="teamA"
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={(itemValue, itemIndex) =>
                  field.onChange(itemValue)
                }
              >
                <Picker.Item label="Select Team A" value="" enabled={false} />
                {teams &&
                  teams
                    .filter((team) => team.id !== teamB)
                    .map((team) => (
                      <Picker.Item
                        label={team.name}
                        value={team.id}
                        key={team.id}
                      />
                    ))}
              </Picker>
            )}
          />

          <Controller
            control={control}
            name="teamB"
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={(itemValue, itemIndex) =>
                  field.onChange(itemValue)
                }
              >
                <Picker.Item label="Select Team B" value="" enabled={false} />
                {teams &&
                  teams
                    .filter((team) => team.id !== teamA)
                    .map((team) => (
                      <Picker.Item
                        label={team.name}
                        value={team.id}
                        key={team.id}
                      />
                    ))}
              </Picker>
            )}
          />

          <DateTimePicker
            value={selectedDate}
            mode="date"
            minimumDate={new Date()}
            onChange={(event, date) => {
              if (date) setValue("date", date);
            }}
          />

          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={teamFormStyles.submitButton}
          >
            <Text>Submit</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

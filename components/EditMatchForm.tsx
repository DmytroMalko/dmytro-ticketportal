import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Match } from "@/types/globalTypes";
import { teamFormStyles } from "@/styles/formStyles";
import useSportsStore from "@/store/store";

interface EditMatchFormProps {
  match: Match | null;
}

interface FormData {
  score: string;
}

const EditMatchForm: React.FC<EditMatchFormProps> = ({ match }) => {
  //Rgex validaion could be added for score
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      score: match?.score ? match.score : "0:0",
    },
  });

  const removeMatch = useSportsStore((state) => state.removeMatch);
  const updateMatch = useSportsStore((state) => state.updateMatch);

  const handleUpdateScore = (data: FormData) => {
    if (!match) return;
    updateMatch(match.id, data.score);
  };

  const handleDelete = () => {
    if (!match) return;
    removeMatch(match.id);
  };

  return (
    <View>
      {match ? (
        <>
          <Text>Score</Text>
          <Controller
            control={control}
            name="score"
            render={({ field }) => (
              <TextInput
                style={teamFormStyles.input}
                placeholder="Team Score"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Pressable
            onPress={handleSubmit(handleUpdateScore)}
            style={({ pressed }) => [
              teamFormStyles.submitButton,
              pressed && teamFormStyles.submitButtonPressed,
            ]}
          >
            <Text style={teamFormStyles.buttonText}>Submit</Text>
          </Pressable>
          <Pressable>
            <Text style={teamFormStyles.removeButton} onPress={handleDelete}>
              Delete
            </Text>
          </Pressable>
        </>
      ) : (
        <Text>Match not selected</Text>
      )}
    </View>
  );
};

export default EditMatchForm;

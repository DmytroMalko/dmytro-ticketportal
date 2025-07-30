import { StyleSheet } from "react-native";

export const teamFormStyles = StyleSheet.create({
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

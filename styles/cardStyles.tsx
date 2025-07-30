import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#f0f0f0", // Placeholder background
  },

  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
});

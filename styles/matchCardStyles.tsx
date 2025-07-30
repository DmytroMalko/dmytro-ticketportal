import { StyleSheet } from "react-native";

export const matchCard = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    width: "100%",
  },
  team: {
    alignItems: "center",
    width: 80,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 4,
    borderRadius: 4,
  },
  teamName: {
    fontSize: 12,
    textAlign: "center",
  },
  center: {
    display: "flex",
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

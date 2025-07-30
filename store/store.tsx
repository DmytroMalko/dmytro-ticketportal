import { SportsStore } from "@/types/storeTypes";
import { create } from "zustand";

const useSportsStore = create<SportsStore>((set) => ({
  teams: [],
  matches: [],

  // TODO: Add validation of duplicates
  addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),

  removeTeam: (teamId) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
    })),

  addMatch: (match) => set((state) => ({ matches: [...state.matches, match] })),

  updateMatch: (matchId, score) =>
    set((state) => ({
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, score } : match
      ),
    })),

  removeMatch: (matchId) =>
    set((state) => ({
      matches: state.matches.filter((match) => match.id !== matchId),
    })),
}));

export default useSportsStore;

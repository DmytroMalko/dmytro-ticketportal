import { Match, Team } from "./globalTypes"

export interface SportsStore {
    teams: Team[]
    matches: Match[]
  
    addTeam: (team: Team) => void
    removeTeam: (teamId: string) => void
  
    addMatch: (match: Match) => void
    updateMatch: (matchId: string, score: string) => void
    removeMatch: (matchId: string) => void
  }
  
import { Image } from "react-native-reanimated/lib/typescript/Animated"

export interface Team {
    id: string;
    name: string;
    logo?: string;
    players: string[];
}

export interface Match { 
    id: string;
    teamA: string;
    teamB: string;
    date: Date;
    score?: string;
}
import { Location } from "./Location";

// Character interface and related types
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}


export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";
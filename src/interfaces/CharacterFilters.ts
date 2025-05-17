import { CharacterStatus, CharacterGender } from "./Character";

// Character filters
export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
  page?: number;
}

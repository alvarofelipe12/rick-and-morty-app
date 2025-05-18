import axios from "axios";
import { CharacterFilters } from "../interfaces/CharacterFilters";
import { ApiResponse } from "../interfaces/ApiResponse";
import { Character } from "../interfaces/Character";
import { Episode } from "../interfaces/Episode";

// Base URL for the Rick and Morty API
const API_BASE_URL = "https://rickandmortyapi.com/api";

// Create an axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Service class to handle Rick and Morty API requests
 */
class RickAndMortyService {
  /**
   * Fetch characters with optional filters
   * @param filters - Optional filters for characters
   * @returns Promise with character data
   */
  async getCharacters(
    filters?: CharacterFilters
  ): Promise<ApiResponse<Character>> {
    try {
      // Convert filters object to URL query params
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.append(key, value.toString());
          }
        });
      }

      const queryString = params.toString();
      const url = `/character${queryString ? `?${queryString}` : ""}`;

      const response = await apiClient.get<ApiResponse<Character>>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Return empty results for 404 (no characters found)
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      throw error;
    }
  }

  /**
   * Fetch a single character by ID
   * @param id - Character ID
   * @returns Promise with character data
   */
  async getCharacterById(id: number): Promise<Character> {
    const response = await apiClient.get<Character>(`/character/${id}`);
    return response.data;
  }

  /**
   * Fetch an episode by ID
   * @param id - Episode ID
   * @returns Promise with episode data
   */
  async getEpisodeById(id: number): Promise<Episode> {
    const response = await apiClient.get<Episode>(`/episode/${id}`);
    return response.data;
  }

  /**
   * Extract ID from URL
   * Helper method to extract ID from Rick and Morty API URLs
   * @param url - API URL
   * @returns ID number
   */
  extractIdFromUrl(url: string): number {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1], 10);
  }
}

export const rickAndMortyService = new RickAndMortyService();

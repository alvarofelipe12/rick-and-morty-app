import { useState, useEffect, useCallback, useRef } from "react";
import { rickAndMortyService } from "../api/rickAndMortyService";
import { Character } from "../interfaces/Character";
import { CharacterFilters } from "../interfaces/CharacterFilters";
import { ApiResponse } from "../interfaces/ApiResponse";

/**
 * Custom hook to fetch and filter characters
 */
export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CharacterFilters>({
    page: 1,
    name: "",
    status: undefined,
    species: undefined,
    gender: undefined,
  });
  const [pagination, setPagination] = useState<{
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  }>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  // Track if we're loading more or doing a fresh load
  const isLoadingMore = useRef(false);
  const isLoadingMoreCurrentVal = isLoadingMore.current

  // Track previous filter values to detect non-page filter changes
  const prevFiltersRef = useRef({ ...filters });

  /**
   * Check if non-page filters have changed
   */
  const haveFiltersChanged = useCallback(
    (prevFilters: CharacterFilters, currentFilters: CharacterFilters) => {
      return (
        prevFilters.name !== currentFilters.name ||
        prevFilters.status !== currentFilters.status ||
        prevFilters.species !== currentFilters.species ||
        prevFilters.gender !== currentFilters.gender
      );
    },
    []
  );

  /**
   * Fetch characters based on current filters
   */
  const fetchCharacters = useCallback(async () => {
    setError(null);
    const shouldAccumulate = isLoadingMore.current;
    setLoading(!shouldAccumulate);

    try {
      const response: ApiResponse<Character> =
        await rickAndMortyService.getCharacters(filters);
      if (shouldAccumulate) {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.results,
        ]);
      } else {
        setCharacters(response.results);
      }
      setPagination(response.info);
    } catch (err) {
      setError("Error fetching characters. Please try again.");
      if (!shouldAccumulate) {
        setCharacters([]);
      }
    } finally {
      setLoading(false);
      isLoadingMore.current = false;
    }
  }, [filters]);

  // Fetch characters when filters change
  useEffect(() => {
    // Reset accumulated characters if any filter besides page has changed
    if (haveFiltersChanged(prevFiltersRef.current, filters)) {
      isLoadingMore.current = false;
    }
    fetchCharacters();
    // Update previous filters reference
    prevFiltersRef.current = { ...filters };
  }, [filters, fetchCharacters, haveFiltersChanged]);

  /**
   * Update filters with new values
   * @param newFilters - New filter values to apply
   */
  const updateFilters = useCallback(
    (newFilters: Partial<CharacterFilters>) => {
      // If changing any filter other than page, we'll need to reset
      if (
        newFilters.page === undefined ||
        haveFiltersChanged(filters, { ...filters, ...newFilters })
      ) {
        isLoadingMore.current = false;
      }

      setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
        // Reset to page 1 when filters change (except when explicitly changing page)
        page: newFilters.page !== undefined ? newFilters.page : 1,
      }));
    },
    [filters, haveFiltersChanged]
  );

  /**
   * Load more characters (next page)
   */
  const loadMore = useCallback(() => {
    if (pagination.next) {
      isLoadingMore.current = true;
      setFilters((prev) => ({
        ...prev,
        page: (prev.page || 1) + 1,
      }));
    }
  }, [pagination.next]);

  return {
    characters,
    loading,
    isLoadingMoreCurrentVal,
    error,
    filters,
    pagination,
    updateFilters,
    loadMore,
    refetch: () => {
      isLoadingMore.current = false;
      fetchCharacters();
    },
  };
};

/**
 * Custom hook to fetch a single character by ID
 */
export const useCharacterDetails = (characterId: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await rickAndMortyService.getCharacterById(characterId);
        setCharacter(data);
      } catch (err) {
        setError("Error fetching character details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacter();
    }
  }, [characterId]);

  return { character, loading, error };
};

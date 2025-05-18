import React from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterFilter from '../components/characters/CharacterFilter';
import CharacterList from '../components/characters/CharacterList';
import banner from '../assets/rick-and-morty-banner.svg'

/**
 * HomePage Component
 * Main page that displays the character search, filters, and results
 */
const HomePage: React.FC = () => {
  // Use the custom hook to manage characters and filters
  const {
    characters,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    loadMore,
  } = useCharacters();

  return (
    <div>
      <div className="mb-6">
        <img
          src={banner}
          alt="Rick and Morty Banner"
          className="w-auto h-44 justify-self-center"
          onError={(e) => {
            // Fallback in case the banner image doesn't load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Filters section */}
      <CharacterFilter
        filters={filters}
        onFilterChange={updateFilters}
      />

      {/* Character list */}
      <CharacterList
        characters={characters}
        loading={loading}
        error={error}
        pagination={pagination}
        onPageChange={loadMore}
      />
    </div>
  );
};

export default HomePage;
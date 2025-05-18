import React from 'react';
import CharacterCard from './CharacterCard';
import { Character } from '../../interfaces/Character';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  onPageChange: () => void;
}

/**
 * Character List Component
 * Displays a grid of character cards with pagination
 */
const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-6">
        <p>{error}</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 my-6">
        <p>No characters found with the current filters. Try adjusting your search criteria.</p>
      </div>
    );
  }

  // Calculate current page information
  const totalPages = pagination.pages;

  return (
    <div data-testid="character-list">
      {/* Character Grid */}
      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center pb-8">
          <Button
            onClick={onPageChange}
            disabled={!pagination.next}
            variant="outline"
            data-testid="next-page-button"
          >
            LOAD MORE
          </Button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
import React from 'react';
import { Link } from 'react-router';
import { Character } from '../../interfaces/Character';

interface CharacterCardProps {
  character: Character;
}

/**
 * Character Card Component - Displays individual character information
 * Based on the Figma design from the task description
 */
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link
      to={`/character/${character.id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      data-testid="character-card"
    >
      <div className="flex flex-col md:flex-row">
        {/* Character Image */}
        <div className="w-full md:w-2/5">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Character Info */}
        <div className="w-full md:w-3/5 p-4">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-800 mb-1" data-testid="character-name">
              {character.name}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">
                {character.species}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacters';
import { Badge } from '../components/common/Badge';
import { rickAndMortyService } from '../api/rickAndMortyService';
import { Episode } from '../interfaces/Episode';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

/**
 * CharacterDetailPage Component
 * Displays detailed information about a specific character
 */
const CharacterDetailPage: React.FC = () => {
  // Get character ID from URL params
  const { id } = useParams<{ id: string }>();
  const characterId = parseInt(id || '0', 10);

  // Fetch character details
  const { character, loading, error } = useCharacterDetails(characterId);

  // State for episode data
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  // Fetch episodes when character data is available
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!character) return;

      setLoadingEpisodes(true);
      try {
        // Extract episode IDs from episode URLs
        const episodeIds = character.episode.map(url =>
          rickAndMortyService.extractIdFromUrl(url)
        );

        // Only fetch if there are episodes
        if (episodeIds.length > 0) {
          // If there's only one episode, we need to handle it differently
          if (episodeIds.length === 1) {
            const episode = await rickAndMortyService.getEpisodeById(episodeIds[0]);
            setEpisodes([episode]);
          } else {
            // Fetch all episodes in parallel
            const episodePromises = episodeIds.slice(0, 5).map(
              id => rickAndMortyService.getEpisodeById(id)
            );
            const episodeData = await Promise.all(episodePromises);
            setEpisodes(episodeData);
          }
        }
      } catch (err) {
        console.error('Error fetching episodes:', err);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [character]);

  // Determine badge variant based on character status
  const getBadgeVariant = () => {
    if (!character) return 'default';

    switch (character.status) {
      case 'Alive':
        return 'success';
      case 'Dead':
        return 'error';
      default:
        return 'warning';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-6">
        <p>{error || 'Character not found'}</p>
        <Link to="/" className="text-primary hover:underline mt-2 inline-block">
          Back to characters
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link to="/" className="inline-block mb-6">
        <Button variant="outline">
          &larr; Back to characters
        </Button>
      </Link>

      {/* Character card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          {/* Character image */}
          <div className="md:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Character info */}
          <div className="md:w-2/3 p-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{character.name}</h1>
              <div className="flex items-center space-x-2">
                <Badge
                  text={character.status}
                  variant={getBadgeVariant()}
                />
                <span className="text-gray-600">
                  {character.species} - {character.gender}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Origin</h2>
                <p className="text-gray-600">{character.origin.name}</p>
              </div>

              {/* Location information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Last known location</h2>
                <p className="text-gray-600">{character.location.name}</p>
              </div>

              {/* Type information if available */}
              {character.type && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Type</h2>
                  <p className="text-gray-600">{character.type}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Episodes section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Featured Episodes
          <span className="text-gray-500 text-lg ml-2">({character.episode.length} total)</span>
        </h2>

        {loadingEpisodes ? (
          <LoadingSpinner />
        ) : episodes.length > 0 ? (
          <div className="space-y-4">
            {episodes.map(episode => (
              <div key={episode.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-gray-800">{episode.name}</h3>
                <p className="text-gray-600 text-sm">{episode.episode} • {episode.air_date}</p>
              </div>
            ))}
            {character.episode.length > 5 && (
              <p className="text-gray-500 italic">
                Showing 5 of {character.episode.length} episodes
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No episode information available.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;
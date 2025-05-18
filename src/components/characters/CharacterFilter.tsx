import React, { useState, useEffect } from 'react';
import { CharacterFilters } from '../../interfaces/CharacterFilters';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface CharacterFilterProps {
  filters: CharacterFilters;
  onFilterChange: (filters: Partial<CharacterFilters>) => void;
}

/**
 * Character Filter Component
 * Allows users to search and filter characters
 */
const CharacterFilter: React.FC<CharacterFilterProps> = ({
  filters,
  onFilterChange
}) => {
  // Local state for form inputs
  const [localFilters, setLocalFilters] = useState<CharacterFilters>({
    name: filters.name || '',
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  // Update local state when props change
  useEffect(() => {
    setLocalFilters({
      name: filters.name || '',
      status: filters.status,
      species: filters.species,
      gender: filters.gender,
    });
  }, [filters]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For select inputs, convert empty strings to undefined
    const processedValue = value === '' ? undefined : value;
    const updatedFilters = {
      ...localFilters,
      [name]: processedValue,
    };

    setLocalFilters(updatedFilters);

    // Apply the filter change when input changes
    onFilterChange(updatedFilters);
  };

  // Status options for select dropdown
  const statusOptions = [
    { value: 'Alive', label: 'Alive' },
    { value: 'Dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ];

  // Species options for select dropdown
  const speciesOptions = [
    { value: 'Alien', label: 'Alien' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' },
    { value: 'Human', label: 'Human' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Mythological Creature', label: 'Mythological Creature' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Robot', label: 'Robot' },
    { value: 'unknown', label: 'Unknown' },
  ];

  // Gender options for select dropdown
  const genderOptions = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 mb-6" data-testid="character-filter">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Name Search */}
          <Input
            id="name"
            name="name"
            value={localFilters.name || ''}
            onChange={handleInputChange}
            placeholder="Filter by name..."
            data-testid="name-filter"
          />
          {/* Species Filter */}
          <Select
            id="species"
            name="species"
            value={localFilters.species || ''}
            onChange={handleInputChange}
            options={speciesOptions}
            placeholder="Species"
            data-testid="species-filter"
          />

          {/* Gender Filter */}
          <Select
            id="gender"
            name="gender"
            value={localFilters.gender || ''}
            onChange={handleInputChange}
            options={genderOptions}
            placeholder="Gender"
            data-testid="gender-filter"
          />

          {/* Status Filter */}
          <Select
            id="status"
            name="status"
            value={localFilters.status || ''}
            onChange={handleInputChange}
            options={statusOptions}
            placeholder="Status"
            data-testid="status-filter"
          />
        </div>
    </div>
  );
};

export default CharacterFilter;
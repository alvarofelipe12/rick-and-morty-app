import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { useCharacters } from '../hooks/useCharacters';

// Mock the custom hook
jest.mock('../hooks/useCharacters');

// Mock the child components
jest.mock('../components/characters/CharacterFilter', () => ({
  __esModule: true,
  default: ({ filters, onFilterChange }: any) => (
    <div data-testid="character-filter">
      <button onClick={() => onFilterChange({ name: 'Rick' })}>
        Filter
      </button>
    </div>
  )
}));

jest.mock('../components/characters/CharacterList', () => ({
  __esModule: true,
  default: ({ characters, loading, error, pagination, onPageChange }: any) => (
    <div data-testid="character-list">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {characters?.map((char: any) => (
        <div key={char.id}>{char.name}</div>
      ))}
      {pagination?.next && (
        <button onClick={onPageChange}>Load More</button>
      )}
    </div>
  )
}));

describe('HomePage', () => {
  const mockUseCharacters = useCharacters as jest.Mock;

  const defaultMockData = {
    characters: [],
    loading: false,
    error: null,
    filters: { name: '', status: '', gender: '' },
    pagination: { next: null },
    updateFilters: jest.fn(),
    loadMore: jest.fn(),
  };

  beforeEach(() => {
    mockUseCharacters.mockReturnValue(defaultMockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the banner image', () => {
    render(<HomePage />);
    const banner = screen.getByAltText('Rick and Morty Banner');
    expect(banner).toBeInTheDocument();
  });

  test('handles banner image load error', () => {
    render(<HomePage />);
    const banner = screen.getByAltText('Rick and Morty Banner');
    fireEvent.error(banner);
    expect(banner).toHaveStyle({ display: 'none' });
  });

  test('renders CharacterFilter component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('character-filter')).toBeInTheDocument();
  });

  test('renders CharacterList component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('character-list')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    mockUseCharacters.mockReturnValue({
      ...defaultMockData,
      loading: true,
    });
    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error state', () => {
    mockUseCharacters.mockReturnValue({
      ...defaultMockData,
      error: 'Failed to fetch characters',
    });
    render(<HomePage />);
    expect(screen.getByText('Error: Failed to fetch characters')).toBeInTheDocument();
  });

  test('handles filter changes', () => {
    const updateFilters = jest.fn();
    mockUseCharacters.mockReturnValue({
      ...defaultMockData,
      updateFilters,
    });

    render(<HomePage />);
    fireEvent.click(screen.getByText('Filter'));
    expect(updateFilters).toHaveBeenCalledWith({ name: 'Rick' });
  });

  test('handles load more', () => {
    const loadMore = jest.fn();
    mockUseCharacters.mockReturnValue({
      ...defaultMockData,
      pagination: { next: 'page2' },
      loadMore,
    });

    render(<HomePage />);
    fireEvent.click(screen.getByText('Load More'));
    expect(loadMore).toHaveBeenCalled();
  });
});
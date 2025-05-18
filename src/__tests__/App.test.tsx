import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';

// Mock the Layout component since we're only testing routing
jest.mock('../components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-layout">{children}</div>
  )
}));

// Mock the page components
jest.mock('../pages/HomePage', () => ({
  __esModule: true,
  default: () => <div>Home Page</div>
}));

jest.mock('../pages/CharacterDetailPage', () => ({
  __esModule: true,
  default: () => <div>Character Detail Page</div>
}));

jest.mock('../pages/NotFoundPage', () => ({
  __esModule: true,
  default: () => <div>404 Page</div>
}));

describe('App Component', () => {
  test('renders HomePage on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('renders CharacterDetailPage for character route', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Character Detail Page')).toBeInTheDocument();
  });

  test('renders NotFoundPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('404 Page')).toBeInTheDocument();
  });

  test('renders within Layout component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
  });
});
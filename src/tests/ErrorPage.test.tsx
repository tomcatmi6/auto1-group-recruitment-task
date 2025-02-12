import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../pages/ErrorPage';
import '@testing-library/jest-dom';

describe('ErrorPage component', () => {
  it('renders 404 message and link to homepage', () => {
    render(<ErrorPage />);
    
    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();

    const homepageLink = screen.getByRole('link', { name: /homepage/i });
    expect(homepageLink).toBeInTheDocument();
    expect(homepageLink).toHaveAttribute('href', '/');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Publish from './pages/editor/index';

test('renders learn react link', () => {
  render(<Publish />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

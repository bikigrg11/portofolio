import { render, screen } from '@testing-library/react'
import { Nav } from './Nav'
it('renders brand and nav links', () => {
  render(<Nav />)
  expect(screen.getByText(/GURUNG/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects')
})

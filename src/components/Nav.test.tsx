import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
// The nav logo mounts an R3F <Canvas>, which needs WebGL/ResizeObserver that
// jsdom lacks — mock it out so the nav renders in tests.
vi.mock('./KnotLogo', () => ({ KnotLogo: () => null }))
import { Nav } from './Nav'
it('renders brand and nav links', () => {
  render(<Nav />)
  expect(screen.getByText(/GURUNG/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects')
})

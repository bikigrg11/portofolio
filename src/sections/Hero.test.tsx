import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

vi.mock('../three/HeroCanvas', () => ({ HeroCanvas: () => null }))

it('shows headline stats and email CTA', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { name: /100/ })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /touch/i })).toHaveAttribute('href', 'mailto:bikigurung8@gmail.com')
})

import { render, screen } from '@testing-library/react'
import { ProjectCarousel } from './ProjectCarousel'

it('renders the first project title', () => {
  render(<ProjectCarousel />)
  expect(screen.getByText('Kubernetes MCP Server')).toBeInTheDocument()
})

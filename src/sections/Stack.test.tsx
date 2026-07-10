import { render, screen } from '@testing-library/react'
import { Stack } from './Stack'
it('renders skill groups', () => {
  render(<Stack />)
  expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument()
})

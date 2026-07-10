import { render } from '@testing-library/react'
import { McpDiagram } from './McpDiagram'
it('renders an svg', () => {
  const { container } = render(<McpDiagram />)
  expect(container.querySelector('svg')).toBeTruthy()
})

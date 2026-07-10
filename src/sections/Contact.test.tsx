import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'
it('links email and github', () => {
  render(<Contact />)
  expect(screen.getByText(/bikigurung8@gmail.com/)).toBeInTheDocument()
  expect(screen.getByText(/bikigrg11/)).toBeInTheDocument()
})

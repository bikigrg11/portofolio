import { render, screen } from '@testing-library/react'
import { CaseStudy } from './CaseStudy'
const p = { id:'x', num:'01', title:'Test Project', year:'2026', role:'solo',
  problem:'A problem.', built:'The build.', metrics:[{n:'35%',label:'cut'}],
  stack:['Go'], links:[{label:'GitHub',href:'#'}], shot:'/shots/x.png', featured:true }
it('renders problem, built, metric and stack', () => {
  render(<CaseStudy project={p as any} index={0} />)
  expect(screen.getByText('The build.')).toBeInTheDocument()
  expect(screen.getByText('35%')).toBeInTheDocument()
  expect(screen.getByText('Go')).toBeInTheDocument()
})

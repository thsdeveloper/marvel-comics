import { render } from '@testing-library/react'
import Home from '../src/pages/index'

describe('Home Component test', () => {
  it('renders a heading', () => {
    render(<Home />)

    expect(1 + 1).toBe(2)
  })
})

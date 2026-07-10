import { renderHook } from '@testing-library/react'
import { useWebGLSupported } from './useWebGLSupported'
it('returns a boolean', () => {
  const { result } = renderHook(() => useWebGLSupported())
  expect(typeof result.current).toBe('boolean')
})

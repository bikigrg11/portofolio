import '@testing-library/jest-dom'

// jsdom has no IntersectionObserver; framer-motion's `whileInView` needs one to mount.
// A minimal stub is enough for tests — it never actually fires, but lets components render.
class IntersectionObserverStub {
  root = null
  rootMargin = ''
  thresholds: number[] = []
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver
}

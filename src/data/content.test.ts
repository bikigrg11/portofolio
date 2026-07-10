import { describe, it, expect } from 'vitest'
import { projects, profile, skills } from './content'

describe('content', () => {
  it('has profile facts from profile.md', () => {
    expect(profile.email).toBe('bikigurung8@gmail.com')
    expect(profile.github).toContain('bikigrg11')
    expect(profile.stats.length).toBeGreaterThanOrEqual(3)
  })
  it('has at least 4 featured projects with required fields', () => {
    const feat = projects.filter(p => p.featured)
    expect(feat.length).toBeGreaterThanOrEqual(4)
    for (const p of feat) {
      expect(p.title).toBeTruthy()
      expect(p.problem).toBeTruthy()
      expect(p.built).toBeTruthy()
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
  it('groups skills', () => {
    expect(skills.some(s => s.group.match(/Kubernetes/i))).toBe(true)
  })
})

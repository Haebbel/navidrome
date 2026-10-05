import { describe, it, expect } from 'vitest'
import songLists, { isSongListActive } from './songLists'

const loc = (pathname, search) => ({ pathname, search })

describe('songLists', () => {
  it('defines song-level presets backed by song sort fields and filters', () => {
    expect(songLists.random.params).toContain('sort=random')
    expect(songLists.recentlyAdded.params).toContain('sort=recently_added')
    expect(songLists.recentlyPlayed.params).toContain('"played":true')
    expect(songLists.mostPlayed.params).toContain('sort=play_count')
  })

  describe('isSongListActive', () => {
    it('matches the URL carrying the same sort and filter', () => {
      const search = `?${songLists.mostPlayed.params}&page=1&perPage=15`
      expect(isSongListActive('mostPlayed')(null, loc('/song', search))).toBe(
        true,
      )
    })

    it('does not match a different preset or another route', () => {
      const search = `?${songLists.mostPlayed.params}`
      expect(isSongListActive('random')(null, loc('/song', search))).toBe(false)
      expect(isSongListActive('mostPlayed')(null, loc('/album', search))).toBe(
        false,
      )
    })
  })
})

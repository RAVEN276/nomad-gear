import { describe, it, expect, vi } from 'vitest'
import { useReviewStore } from './useReviewStore'

describe('useReviewStore', () => {
  it('initializes with empty reviews', () => {
    const state = useReviewStore.getState()
    expect(state.reviews).toEqual({})
  })

  it('adds a review successfully', () => {
    const testReview = {
      id: 'test-1',
      gearId: 'gear-1',
      userId: 'user-1',
      userName: 'John Doe',
      rating: 5,
      comment: 'Great product!',
      date: '2025-01-15',
    }

    useReviewStore.getState().addReview(testReview)
    const reviews = useReviewStore.getState().getReviews('gear-1')
    
    expect(reviews.length).toBe(1)
    expect(reviews[0]).toEqual(testReview)
  })

  it('calculates average rating correctly', () => {
    useReviewStore.setState({ reviews: {} })
    
    useReviewStore.getState().addReview({
      id: 'test-1',
      gearId: 'gear-2',
      userId: 'user-1',
      userName: 'John',
      rating: 4,
      comment: 'Good',
      date: '2025-01-15',
    })

    useReviewStore.getState().addReview({
      id: 'test-2',
      gearId: 'gear-2',
      userId: 'user-2',
      userName: 'Jane',
      rating: 5,
      comment: 'Excellent',
      date: '2025-01-16',
    })

    const average = useReviewStore.getState().getAverageRating('gear-2')
    expect(average).toBe(4.5)
  })

  it('returns 0 for average rating when no reviews exist', () => {
    const average = useReviewStore.getState().getAverageRating('nonexistent-gear')
    expect(average).toBe(0)
  })

  it('stores reviews by gear ID', () => {
    useReviewStore.setState({ reviews: {} })
    
    useReviewStore.getState().addReview({
      id: 'test-1',
      gearId: 'gear-a',
      userId: 'user-1',
      userName: 'John',
      rating: 5,
      comment: 'Review A',
      date: '2025-01-15',
    })

    useReviewStore.getState().addReview({
      id: 'test-2',
      gearId: 'gear-b',
      userId: 'user-2',
      userName: 'Jane',
      rating: 4,
      comment: 'Review B',
      date: '2025-01-16',
    })

    const reviewsA = useReviewStore.getState().getReviews('gear-a')
    const reviewsB = useReviewStore.getState().getReviews('gear-b')
    
    expect(reviewsA.length).toBe(1)
    expect(reviewsB.length).toBe(1)
    expect(reviewsA[0].gearId).toBe('gear-a')
    expect(reviewsB[0].gearId).toBe('gear-b')
  })
})

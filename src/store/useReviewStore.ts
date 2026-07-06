import { create } from 'zustand'

export interface Review {
  id: string
  gearId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface ReviewState {
  reviews: Record<string, Review[]>
  addReview: (review: Review) => void
  getReviews: (gearId: string) => Review[]
  getAverageRating: (gearId: string) => number
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: {},
  addReview: (review) =>
    set((state) => {
      const gearReviews = state.reviews[review.gearId] || []
      return {
        reviews: {
          ...state.reviews,
          [review.gearId]: [...gearReviews, review],
        },
      }
    }),
  getReviews: (gearId) => {
    const state = get()
    return state.reviews[gearId] || []
  },
  getAverageRating: (gearId) => {
    const state = get()
    const gearReviews = state.reviews[gearId] || []
    if (gearReviews.length === 0) return 0
    const sum = gearReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / gearReviews.length) * 10) / 10
  },
}))

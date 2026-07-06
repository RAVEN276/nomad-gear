import { useReviewStore } from '@/store/useReviewStore'
import { useReviewForm } from '@/hooks/useReviewForm'
import './ReviewComponents.css'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRate?: (rating: number) => void
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onRate 
}: StarRatingProps) {
  const handleClick = (value: number) => {
    if (interactive && onRate) {
      onRate(value)
    }
  }

  return (
    <div className={`star-rating star-rating-${size}`} role="img" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const value = index + 1
        const isFilled = value <= rating
        const isHalf = !isFilled && value - 0.5 <= rating
        
        return (
          <span
            key={index}
            className={`star ${isFilled ? 'star-filled' : ''} ${isHalf ? 'star-half' : ''} ${interactive ? 'star-interactive' : ''}`}
            onClick={() => handleClick(value)}
            onKeyDown={(e) => {
              if (interactive && onRate && (e.key === 'Enter' || e.key === ' ')) {
                handleClick(value)
              }
            }}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? 'button' : undefined}
            aria-label={interactive ? `${value} stars` : undefined}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

interface ReviewCardProps {
  review: {
    id: string
    userName: string
    rating: number
    comment: string
    date: string
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <span className="reviewer-name">{review.userName}</span>
          <StarRating rating={review.rating} size="sm" />
        </div>
        <time className="review-date" dateTime={review.date}>
          {formattedDate}
        </time>
      </div>
      {review.comment && (
        <p className="review-comment">{review.comment}</p>
      )}
    </div>
  )
}

interface ReviewSectionProps {
  gearId: string
}

export function ReviewSection({ gearId }: ReviewSectionProps) {
  const getReviews = useReviewStore((state) => state.getReviews)
  const getAverageRating = useReviewStore((state) => state.getAverageRating)
  
  const reviews = getReviews(gearId)
  const averageRating = getAverageRating(gearId)

  if (reviews.length === 0) {
    return (
      <section className="review-section">
        <h3>Customer Reviews</h3>
        <p className="no-reviews">No reviews yet. Be the first to review this gear!</p>
      </section>
    )
  }

  return (
    <section className="review-section">
      <div className="review-summary">
        <h3>Customer Reviews</h3>
        <div className="review-stats">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <StarRating rating={averageRating} size="md" />
            <span className="review-count">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
          </div>
        </div>
      </div>
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}

interface ReviewFormProps {
  gearId: string
  onSuccess?: () => void
}

export function ReviewForm({ gearId, onSuccess }: ReviewFormProps) {
  const {
    rating,
    setRating,
    comment,
    setComment,
    userName,
    setUserName,
    isSubmitting,
    handleSubmit,
  } = useReviewForm({ gearId, onSuccess })

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-field">
        <label className="form-label" htmlFor="review-name">
          Your Name
        </label>
        <input
          className="form-input"
          id="review-name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="review-form-field">
        <label className="form-label">Rating</label>
        <StarRating
          rating={rating}
          maxRating={5}
          size="lg"
          interactive
          onRate={setRating}
        />
      </div>

      <div className="review-form-field">
        <label className="form-label" htmlFor="review-comment">
          Your Review
        </label>
        <textarea
          className="form-input"
          id="review-comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this gear..."
        />
      </div>

      <button
        className="primary-button"
        type="submit"
        disabled={isSubmitting || rating === 0}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

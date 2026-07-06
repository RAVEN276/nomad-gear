import { useState } from 'react'
import { useReviewStore, type Review } from '@/store/useReviewStore'
import { useToastStore } from '@/store/useToastStore'

interface UseReviewFormProps {
  gearId: string
  onSuccess?: () => void
}

export function useReviewForm({ gearId, onSuccess }: UseReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  
  const addReview = useReviewStore((state) => state.addReview)
  const addToast = useToastStore((state) => state.addToast)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      addToast('Please select a rating', 'error')
      return
    }

    if (!userName.trim()) {
      addToast('Please enter your name', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const review: Review = {
        id: Math.random().toString(36).substring(2, 9),
        gearId,
        userId: Math.random().toString(36).substring(2, 9),
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
        date: new Date().toISOString(),
      }

      addReview(review)
      addToast('Review submitted successfully!', 'success')
      
      setRating(0)
      setComment('')
      setUserName('')
      
      onSuccess?.()
    } catch (error) {
      addToast('Failed to submit review. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    rating,
    setRating,
    comment,
    setComment,
    userName,
    setUserName,
    isSubmitting,
    handleSubmit,
  }
}

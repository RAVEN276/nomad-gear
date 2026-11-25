import { useToastStore, type Toast } from '@/store/useToastStore'
import './ToastContainer.css'

const toastLabels: Record<Toast['type'], string> = {
  success: 'OK',
  error: 'ERR',
  info: 'INFO',
  warning: 'WARN',
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
        >
          <span className="toast-icon" aria-hidden="true">
            {toastLabels[toast.type]}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

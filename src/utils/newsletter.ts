const MAILCHIMP_ENDPOINT = import.meta.env.VITE_MAILCHIMP_SUBSCRIBE_URL

interface NewsletterErrorPayload {
  detail?: string
  message?: string
  title?: string
}

type NewsletterPayload = NewsletterErrorPayload | string | null

function buildNewsletterErrorMessage(responsePayload: NewsletterPayload): string {
  if (!responsePayload) {
    return 'Unable to subscribe right now. Please try again later.'
  }

  if (typeof responsePayload === 'string') {
    return responsePayload
  }

  return (
    responsePayload.detail ||
    responsePayload.message ||
    responsePayload.title ||
    'Unable to subscribe right now. Please try again later.'
  )
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterPayload> {
  if (!MAILCHIMP_ENDPOINT) {
    throw new Error('Mailchimp endpoint is not configured. Set VITE_MAILCHIMP_SUBSCRIBE_URL.')
  }

  const subscribeResponse = await fetch(MAILCHIMP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      email_address: email,
      status: 'subscribed',
      source: 'nomad-gear-web',
    }),
  })

  const responseType = subscribeResponse.headers.get('content-type') || ''
  let responsePayload: NewsletterPayload = null

  if (responseType.includes('application/json')) {
    responsePayload = (await subscribeResponse.json()) as NewsletterErrorPayload
  } else {
    const responseText = await subscribeResponse.text()
    responsePayload = responseText ? { detail: responseText } : null
  }

  if (!subscribeResponse.ok) {
    throw new Error(buildNewsletterErrorMessage(responsePayload))
  }

  return responsePayload
}

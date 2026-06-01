export async function subscribeEmail(email) {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json().catch(() => {
      throw new Error('Invalid response from server')
    })

    if (!response.ok) {
      throw new Error(data?.error || 'Failed to subscribe')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Unable to subscribe at this time')
  }
}

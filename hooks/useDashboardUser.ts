interface SessionLike {
  user?: {
    name?: string | null
  } | null
}

export default function useDashboardUser(session?: SessionLike | null) {
  if (session?.user?.name) {
    return session.user.name.split(' ')[0]
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('campushub_user')
      if (stored) {
        const parsed = JSON.parse(stored) as { name?: string }
        return parsed.name?.split(' ')[0] || 'there'
      }
    } catch {
      // Ignore malformed localStorage payloads.
    }
  }

  return 'there'
}

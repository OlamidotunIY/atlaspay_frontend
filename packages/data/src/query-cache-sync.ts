import { QueryClient } from "@tanstack/react-query"

export function setupQueryCacheSync(queryClient: QueryClient): () => void {
  const unsubscribers: Array<() => void> = []

  // ... one entry per WsEventType that should update the cache

  return () => unsubscribers.forEach(unsub => unsub())  // cleanup function
}
import { useEffect, useState } from 'react';

/**
 * useDraftMessage
 *
 * A React hook that persists a text draft in `localStorage` under a given key.
 * Useful for chat inputs or text editors to prevent accidental loss of typed content.
 *
 * @param key - The key to use in `localStorage`.
 * @returns A tuple `[draft, setDraft]`:
 *   - `draft`: The current draft value from state.
 *   - `setDraft`: A setter function to update the draft.
 */
export function useDraftMessage(key = 'vipChat.draft') {
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setDraft(saved);
  }, [key]);

  useEffect(() => {
    if (draft.trim()) {
      localStorage.setItem(key, draft);
    } else {
      localStorage.removeItem(key);
    }
  }, [draft, key]);

  return [draft, setDraft] as const;
}
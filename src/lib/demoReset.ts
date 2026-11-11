/** Remove only SEAM's versioned demo workspaces, never other site storage. */
export function resetSeamDemo(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const storage = window.localStorage
    const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index))
    for (const key of keys) if (key && /^seam\.(talent|startup)\./.test(key)) storage.removeItem(key)
    return true
  } catch { return false }
}

/**
 * Shared date formatting utilities.
 *
 * ISO  = YYYY-MM-DD  (native <input type="date"> / internal)
 * Display = DD-MM-YYYY (Dutch UI display format)
 */

/** YYYY-MM-DD  ->  DD-MM-YYYY */
export function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

/** DD-MM-YYYY  ->  YYYY-MM-DD */
export function displayToIso(display) {
  if (!display) return ''
  const parts = display.split('-')
  if (parts.length !== 3) return ''
  const [d, m, y] = parts
  return `${y}-${m}-${d}`
}

/** Date object  ->  YYYY-MM-DD (local time, not UTC) */
export function dateToIso(d) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** YYYY-MM-DD  ->  Date object */
export function isoToDate(iso) {
  return iso ? new Date(iso) : new Date()
}

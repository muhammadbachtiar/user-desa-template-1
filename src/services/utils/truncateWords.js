/**
 * Truncates a string by a maximum number of words with a character fallback limit.
 *
 * @param {string} text - The string to truncate
 * @param {number} maxWords - Maximum number of words (default: 2)
 * @param {number} maxChars - Maximum number of characters fallback (default: 30)
 * @param {string} suffix - Suffix to append if truncated (default: '...')
 * @returns {string} Truncated string
 */
export function truncateWords(text, maxWords = 2, maxChars = 30, suffix = "...") {
  if (!text) return "";
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/);

  let result = trimmed;
  if (words.length > maxWords) {
    result = words.slice(0, maxWords).join(" ") + suffix;
  }

  if (result.length > maxChars) {
    result = result.slice(0, maxChars).trim() + suffix;
  }

  return result;
}

export default truncateWords;

// ============================================
// Message Formatter Utility
// ============================================
// Converts markdown-like syntax to HTML
// Restored from original chat.js formatMessage
// ============================================

export function formatMessage(content) {
  if (!content) return '';

  return content
    // Bold: **text** → <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic: *text* → <em>
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code: `text` → <code>
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded text-sm">$1</code>'
    )
    // Newlines → <br>
    .replace(/\n/g, '<br>')
    // Bullet points
    .replace(
      /^• /gm,
      '<span class="text-purple-500 dark:text-purple-400 mr-1">•</span>'
    )
    // Horizontal rule: ---
    .replace(
      /---/g,
      '<hr class="border-gray-200 dark:border-gray-600 my-2">'
    );
}

export default formatMessage;
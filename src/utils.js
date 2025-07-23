//* Highlights matched substrings inside table cells by wrapping them in <mark>.
//* Useful for visual feedback on search input.
export function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'ig');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
}

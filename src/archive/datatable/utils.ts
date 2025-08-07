//* Highlights matched substrings inside table cells by wrapping them in <mark>.
//* Useful for visual feedback on search input.
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}


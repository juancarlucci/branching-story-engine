# RenderFlow

**Interactive, Accessible, Paginated Data Table UI with Sorting, Filtering, and Responsive Design**

Built as a take-home challenge, RenderFlow is a modern React-based app showcasing frontend skills in data display, keyboard interaction, accessibility, and design polish.

---

## 🔧 Features

* **Search filtering** with real-time highlight of matches
* **Sortable columns** with visual indicators (up/down arrows)
* **Pagination** with smooth state sync and accessibility announcements
* **Keyboard navigation** with arrow key support and active-row highlighting
* **Responsive layout** that switches to mobile-friendly card view
* **Accessible**: `aria-live`, semantic tags, `:focus-visible`, screen reader support

---

## 🧠 Architecture

### File Structure

```
src/
  App.js
  components/
    DataTable.js
  styles.css
```

---

## 📄 Key Logic Breakdown

### useCallback for Keyboard Navigation

```js
const handleKeyDown = useCallback(
  (e) => { ... },
  [sortedData.length]
);
```

**Why it's needed:**

* Prevents re-creating the function on every render
* Keeps `useEffect(() => addEventListener(...))` from rebinding each time

### highlightMatch

```js
function highlightMatch(text, query) {
  // Splits text and wraps matches in <mark>
}
```

* Improves UX by clearly surfacing matched text
* Accessible default highlighting with semantic `<mark>`

### Sorting Logic

```js
function handleSort(key) {
  // Toggles sort direction or switches to new sort key
}
```

* Uses `getValue()` helper to support nested fields (`user.company.name`)
* Case-insensitive sorting for consistency

### Pagination

```js
const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
```

* Page state managed via `currentPage`
* Navigation buttons are keyboard accessible
* Screen readers updated with `aria-live="polite"`

---

## ♿ Accessibility Checklist

* [x] Semantic elements: `<table>`, `<th>`, `<td>`, `<button>`, `<input>`
* [x] `aria-label` for input
* [x] `aria-live="polite"` for page announcements
* [x] `:focus-visible` for keyboard-only outlines
* [x] Responsive mobile layout with `data-label` fallback

---

## 🧪 Responsive Design

```css
@media (max-width: 600px) {
  .data-table td::before {
    content: attr(data-label); // Key label for stacked layout
  }
}
```

* Uses `border-collapse: separate` to allow border radius
* Table collapses into mobile-friendly card layout

---

## 🧼 Final Polish

* Active row resets on page change for clean keyboard UX
* Focus ring only shows for keyboard users, not mouse clicks
* Uses `overflow-wrap: break-word` to avoid layout shifts

---

## 🚀 How to Run

```bash
git clone https://github.com/juancarlucci/RenderFlow.git
cd RenderFlow
npm install
npm start
```

---

## 🙌 Credits

Created by [Juan Carlos Collins](https://juancarloscollins.com) as part of a frontend take-home assessment. Feedback and improvements welcome!

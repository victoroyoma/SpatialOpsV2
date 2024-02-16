// TaskSort.jsx

function TaskSort({ onSortChange }) {
  return (
    <div>
      {/* Sort By */}
      <select onChange={(e) => onSortChange("sortBy", e.target.value)}>
        <option value="">Sort By</option>
        <option value="component">Component</option>
        <option value="milestone">Milestone</option>
      </select>

      {/* Sort Order */}
      <select onChange={(e) => onSortChange("sortOrder", e.target.value)}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
}

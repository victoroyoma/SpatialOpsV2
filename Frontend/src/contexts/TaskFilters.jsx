// TaskFilters.jsx

function TaskFilters({ onFilterChange }) {
  return (
    <div>
      {/* Status Filter */}
      <select onChange={(e) => onFilterChange("status", e.target.value)}>
        <option value="">Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Priority Filter */}
      <select onChange={(e) => onFilterChange("priority", e.target.value)}>
        <option value="">Priority</option>
        <option value="Right Now">Right Now</option>
        <option value="Soon">Soon</option>
        <option value="Later">Later</option>
        <option value="Eventually">Eventually</option>
      </select>

      <select onChange={(e) => onFilterChange("assignee", e.target.value)}>
        <option value="">Assignee</option>
        <option value="Victor">Victor</option>
        <option value="Lewey">Lewey</option>
        <option value="Richard">Richard</option>
        <option value="Suzane">Suzane</option>
      </select>
    </div>
  );
}

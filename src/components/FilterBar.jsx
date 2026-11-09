function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  statuses,
}) {
  return (
    <div className="row g-2 mb-3">
      <div className="col-12 col-md-7">
        <input
          type="search"
          className="form-control"
          placeholder="Başlığa göre ara..."
          aria-label="Başlığa göre ara"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="col-12 col-md-5">
        <select
          className="form-select"
          aria-label="Duruma göre filtrele"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">Tüm durumlar</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
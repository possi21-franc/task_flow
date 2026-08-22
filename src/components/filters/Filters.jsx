import React from 'react';
import './Filters.css';

export default function Filters({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  clearCompleted,
  hasCompleted
}) {
  const filters = [
    { value: 'all', label: 'Toutes', icon: '📋' },
    { value: 'active', label: 'En cours', icon: '🔄' },
    { value: 'completed', label: 'Terminées', icon: '✅' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Plus récentes' },
    { value: 'oldest', label: 'Plus anciennes' },
    { value: 'title', label: 'Par titre' }
  ];

  return (
    <div className="filters-container">
      <div className="filters-tabs">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            <span className="filter-icon">{f.icon}</span>
            <span className="filter-label">{f.label}</span>
          </button>
        ))}
      </div>
      
      <div className="filters-actions">
        <div className="sort-wrapper">
          <label className="sort-label">
            <span>Tri</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        {hasCompleted && (
          <button
            className="btn-clear"
            onClick={clearCompleted}
          >
            <i className="fa-solid fa-trash-can"></i>
            Supprimer terminées
          </button>
        )}
      </div>
    </div>
  );
}
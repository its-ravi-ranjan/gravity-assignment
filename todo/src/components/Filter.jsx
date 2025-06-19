import React from 'react';
import '../styles/Filter.css';

const Filter = ({ currentFilter, onChange }) => {
  return (
    <div className="filter-buttons">
      {['all', 'completed', 'pending'].map((f) => (
        <button
          key={f}
          className={currentFilter === f ? 'active' : ''}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;
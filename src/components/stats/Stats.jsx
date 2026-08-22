import React from 'react';
import './Stats.css';

export default function Stats({ stats }) {
  const { total, active, completed, urgent, completionRate } = stats;

  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div className="stat-content">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card stat-active">
          <span className="stat-icon">🔄</span>
          <div className="stat-content">
            <span className="stat-value">{active}</span>
            <span className="stat-label">En cours</span>
          </div>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-icon">✅</span>
          <div className="stat-content">
            <span className="stat-value">{completed}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
        <div className="stat-card stat-urgent">
          <span className="stat-icon">🔴</span>
          <div className="stat-content">
            <span className="stat-value">{urgent}</span>
            <span className="stat-label">Urgentes</span>
          </div>
        </div>
      </div>
      <div className="stats-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <span className="progress-text">{completionRate}% complétées</span>
      </div>
    </div>
  );
}
import React from 'react';

export default function Toolbar({ is3D, onToggle3D, showLayerPanel, onToggleLayerPanel, showLegend, onToggleLegend }) {
  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <h1>Utility Network Viewer</h1>
      </div>

      <div className="toolbar-actions">
        <button
          className={showLayerPanel ? 'active' : ''}
          onClick={onToggleLayerPanel}
          title="Toggle layer panel"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Layers
        </button>

        <button
          className={is3D ? 'active' : ''}
          onClick={onToggle3D}
          title="Toggle 3D view"
        >
          {is3D ? '3D' : '2D'}
        </button>

        <button
          className={showLegend ? 'active' : ''}
          onClick={onToggleLegend}
          title="Toggle legend"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="8" y2="6" />
            <line x1="12" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="8" y2="12" />
            <line x1="12" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="8" y2="18" />
            <line x1="12" y1="18" x2="21" y2="18" />
          </svg>
          Legend
        </button>
      </div>
    </div>
  );
}

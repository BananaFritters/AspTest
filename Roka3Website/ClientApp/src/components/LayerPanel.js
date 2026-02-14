import React from 'react';
import { VALVE_COLOR, HYDRANT_COLOR, METER_COLOR, PUMP_STATION_COLOR } from '../data/sampleNetwork';

const LAYERS = [
  { key: 'pipes',        label: 'Pipes',          color: [0, 119, 190],  type: 'line' },
  { key: 'valves',       label: 'Valves',         color: VALVE_COLOR,    type: 'point' },
  { key: 'hydrants',     label: 'Fire Hydrants',  color: HYDRANT_COLOR,  type: 'point' },
  { key: 'meters',       label: 'Meters',         color: METER_COLOR,    type: 'point' },
  { key: 'pumpStations', label: 'Pump Stations',  color: PUMP_STATION_COLOR, type: 'point' },
  { key: 'labels',       label: 'Labels',         color: [255, 255, 255], type: 'text' }
];

const COLOR_BY_OPTIONS = [
  { value: 'material', label: 'Material' },
  { value: 'pressure', label: 'Pressure' },
  { value: 'diameter', label: 'Diameter' },
  { value: 'status',   label: 'Status' }
];

export default function LayerPanel({ visible, layerVisibility, onToggleLayer, colorBy, onColorByChange }) {
  return (
    <div className={`layer-panel ${visible ? '' : 'collapsed'}`}>
      <div className="layer-panel-content">
        <h3>Network Layers</h3>
        {LAYERS.map(layer => (
          <label key={layer.key} className="layer-item">
            <input
              type="checkbox"
              checked={layerVisibility[layer.key]}
              onChange={() => onToggleLayer(layer.key)}
            />
            <span
              className={`layer-swatch ${layer.type}`}
              style={{
                backgroundColor: `rgb(${layer.color.join(',')})`
              }}
            />
            <span className="layer-label">{layer.label}</span>
          </label>
        ))}

        <h3>Pipe Color By</h3>
        <div className="color-by-section">
          {COLOR_BY_OPTIONS.map(opt => (
            <label key={opt.value} className="color-by-item">
              <input
                type="radio"
                name="colorBy"
                value={opt.value}
                checked={colorBy === opt.value}
                onChange={() => onColorByChange(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        <h3>Data Source</h3>
        <div className="data-source-section">
          <div className="data-source-item active">
            <span className="dot active" />
            <span>Sample Data (local)</span>
          </div>
          <div className="data-source-item">
            <span className="dot" />
            <span>Martin Tile Server</span>
          </div>
          <p className="data-source-hint">
            Connect Martin for live PostGIS vector tiles at <code>/api/tiles</code>
          </p>
        </div>
      </div>
    </div>
  );
}

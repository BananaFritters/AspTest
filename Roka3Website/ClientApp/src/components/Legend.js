import React from 'react';
import { COLOR_SCHEMES, VALVE_COLOR, HYDRANT_COLOR, METER_COLOR, PUMP_STATION_COLOR } from '../data/sampleNetwork';

export default function Legend({ visible, colorBy, layerVisibility }) {
  if (!visible) return null;

  const pipeScheme = COLOR_SCHEMES[colorBy];

  return (
    <div className="legend">
      {layerVisibility.pipes && pipeScheme && (
        <div className="legend-section">
          <h4>Pipes &mdash; {pipeScheme.label}</h4>
          {pipeScheme.items.map((item, i) => (
            <div key={i} className="legend-item">
              <span
                className="legend-swatch line"
                style={{ backgroundColor: `rgb(${item.color.join(',')})` }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {layerVisibility.valves && (
        <div className="legend-section">
          <h4>Valves</h4>
          <div className="legend-item">
            <span className="legend-swatch circle" style={{ backgroundColor: `rgb(${VALVE_COLOR.join(',')})` }} />
            <span>Open</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch circle" style={{ backgroundColor: 'rgb(80,80,80)' }} />
            <span>Closed</span>
          </div>
        </div>
      )}

      {layerVisibility.hydrants && (
        <div className="legend-section">
          <h4>Fire Hydrants</h4>
          <div className="legend-item">
            <span className="legend-swatch circle" style={{ backgroundColor: `rgb(${HYDRANT_COLOR.join(',')})` }} />
            <span>Hydrant</span>
          </div>
        </div>
      )}

      {layerVisibility.meters && (
        <div className="legend-section">
          <h4>Meters</h4>
          <div className="legend-item">
            <span className="legend-swatch circle" style={{ backgroundColor: `rgb(${METER_COLOR.join(',')})` }} />
            <span>Water Meter</span>
          </div>
        </div>
      )}

      {layerVisibility.pumpStations && (
        <div className="legend-section">
          <h4>Facilities</h4>
          <div className="legend-item">
            <span className="legend-swatch circle" style={{ backgroundColor: `rgb(${PUMP_STATION_COLOR.join(',')})` }} />
            <span>Pump Station / Reservoir</span>
          </div>
        </div>
      )}
    </div>
  );
}

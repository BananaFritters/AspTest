import React from 'react';

const LAYER_LABELS = {
  pipes: 'Pipe Segment',
  valves: 'Valve',
  hydrants: 'Fire Hydrant',
  meters: 'Water Meter',
  pumpStations: 'Facility'
};

const UNIT_MAP = {
  diameter_mm: 'mm',
  size_mm: 'mm',
  pressure_bar: 'bar',
  inlet_pressure: 'bar',
  outlet_pressure: 'bar',
  depth_m: 'm',
  length_m: 'm',
  flow_rate_m3h: 'm\u00B3/h',
  flow_rate_lpm: 'L/min',
  reading_m3: 'm\u00B3',
  capacity_m3h: 'm\u00B3/h',
  capacity_m3: 'm\u00B3',
  current_level_pct: '%'
};

const DISPLAY_LABELS = {
  id: 'ID',
  name: 'Name',
  type: 'Type',
  material: 'Material',
  diameter_mm: 'Diameter',
  size_mm: 'Size',
  pressure_bar: 'Pressure',
  inlet_pressure: 'Inlet Pressure',
  outlet_pressure: 'Outlet Pressure',
  depth_m: 'Depth',
  length_m: 'Length',
  flow_rate_m3h: 'Flow Rate',
  flow_rate_lpm: 'Flow Rate',
  install_year: 'Installed',
  status: 'Status',
  last_inspection: 'Last Inspection',
  last_test: 'Last Test',
  last_read: 'Last Reading',
  customer: 'Customer',
  reading_m3: 'Meter Reading',
  capacity_m3h: 'Capacity',
  capacity_m3: 'Storage Capacity',
  current_level_pct: 'Current Level',
  pumps: 'Total Pumps',
  active_pumps: 'Active Pumps'
};

const SKIP_KEYS = ['layerType'];

function formatValue(key, value) {
  if (value === null || value === undefined) return '-';
  const unit = UNIT_MAP[key];
  if (unit) return `${value} ${unit}`;
  if (key === 'material') return value.replace(/_/g, ' ');
  return String(value);
}

function statusClass(status) {
  if (!status) return '';
  const s = status.toUpperCase();
  if (s === 'ACTIVE' || s === 'OPEN' || s === 'RUNNING') return 'status-active';
  if (s === 'CLOSED' || s === 'DISCONNECTED' || s === 'OUT_OF_SERVICE') return 'status-closed';
  if (s === 'MAINTENANCE') return 'status-maintenance';
  if (s === 'ABANDONED') return 'status-abandoned';
  return '';
}

export default function FeatureInfoPanel({ feature, onClose }) {
  if (!feature) return null;

  const layerLabel = LAYER_LABELS[feature.layerType] || 'Feature';
  const entries = Object.entries(feature).filter(([k]) => !SKIP_KEYS.includes(k));

  return (
    <div className="feature-info-panel">
      <div className="fi-header">
        <div>
          <div className="fi-type">{layerLabel}</div>
          <div className="fi-id">{feature.id || feature.name || '-'}</div>
        </div>
        <button className="fi-close" onClick={onClose}>&times;</button>
      </div>

      <div className="fi-body">
        <table>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key}>
                <td className="fi-key">{DISPLAY_LABELS[key] || key}</td>
                <td className={`fi-value ${key === 'status' ? statusClass(value) : ''}`}>
                  {formatValue(key, value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

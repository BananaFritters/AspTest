// ============================================================
// Sample Water Distribution Network - Amsterdam area
// ============================================================
// This module provides GeoJSON FeatureCollections for a demo
// utility network. In production, this data would come from
// PostGIS via the /api/network endpoint or Martin tile server.
// ============================================================

// --- Color schemes for pipe rendering ---

export const MATERIAL_COLORS = {
  PVC:           [0, 119, 190],
  CAST_IRON:     [139, 90, 43],
  STEEL:         [140, 140, 140],
  HDPE:          [34, 139, 34],
  DUCTILE_IRON:  [100, 65, 23]
};

export const STATUS_COLORS = {
  ACTIVE:       [0, 150, 136],
  CLOSED:       [244, 67, 54],
  MAINTENANCE:  [255, 152, 0],
  ABANDONED:    [158, 158, 158]
};

export const COLOR_SCHEMES = {
  material: {
    label: 'Material',
    items: [
      { color: [0, 119, 190],  label: 'PVC' },
      { color: [139, 90, 43],  label: 'Cast Iron' },
      { color: [140, 140, 140], label: 'Steel' },
      { color: [34, 139, 34],  label: 'HDPE' },
      { color: [100, 65, 23],  label: 'Ductile Iron' }
    ]
  },
  pressure: {
    label: 'Pressure (bar)',
    items: [
      { color: [76, 175, 80],   label: 'Low (0-2)' },
      { color: [255, 235, 59],  label: 'Medium (2-4)' },
      { color: [255, 152, 0],   label: 'High (4-6)' },
      { color: [244, 67, 54],   label: 'Very High (6+)' }
    ]
  },
  diameter: {
    label: 'Diameter (mm)',
    items: [
      { color: [144, 202, 249], label: 'Small (<100)' },
      { color: [33, 150, 243],  label: 'Medium (100-250)' },
      { color: [13, 71, 161],   label: 'Large (>250)' }
    ]
  },
  status: {
    label: 'Status',
    items: [
      { color: [0, 150, 136],   label: 'Active' },
      { color: [244, 67, 54],   label: 'Closed' },
      { color: [255, 152, 0],   label: 'Maintenance' },
      { color: [158, 158, 158], label: 'Abandoned' }
    ]
  }
};

export function getPipeColor(colorBy, feature) {
  const p = feature.properties;
  switch (colorBy) {
    case 'material':
      return MATERIAL_COLORS[p.material] || [128, 128, 128];
    case 'pressure': {
      const bar = p.pressure_bar;
      if (bar < 2)  return [76, 175, 80];
      if (bar < 4)  return [255, 235, 59];
      if (bar < 6)  return [255, 152, 0];
      return [244, 67, 54];
    }
    case 'diameter': {
      const d = p.diameter_mm;
      if (d < 100)  return [144, 202, 249];
      if (d <= 250) return [33, 150, 243];
      return [13, 71, 161];
    }
    case 'status':
      return STATUS_COLORS[p.status] || [128, 128, 128];
    default:
      return [0, 119, 190];
  }
}

// --- Pipe segments ---

export const pipes = {
  type: 'FeatureCollection',
  features: [
    // === Transmission Mains ===
    {
      type: 'Feature',
      properties: {
        id: 'TM-001', name: 'Main Transmission East-West',
        type: 'transmission', material: 'STEEL', diameter_mm: 400,
        pressure_bar: 5.2, depth_m: 2.5, length_m: 1420,
        install_year: 1998, status: 'ACTIVE',
        flow_rate_m3h: 320
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8750, 52.3650], [4.8775, 52.3651], [4.8800, 52.3650],
          [4.8825, 52.3649], [4.8850, 52.3650], [4.8875, 52.3651],
          [4.8900, 52.3650], [4.8925, 52.3649], [4.8950, 52.3650]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'TM-002', name: 'Main Transmission North-South',
        type: 'transmission', material: 'STEEL', diameter_mm: 350,
        pressure_bar: 5.0, depth_m: 2.3, length_m: 1110,
        install_year: 2001, status: 'ACTIVE',
        flow_rate_m3h: 280
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8850, 52.3600], [4.8851, 52.3620], [4.8850, 52.3650],
          [4.8849, 52.3670], [4.8850, 52.3700]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'TM-003', name: 'Transmission Spur Southeast',
        type: 'transmission', material: 'CAST_IRON', diameter_mm: 300,
        pressure_bar: 4.5, depth_m: 2.0, length_m: 520,
        install_year: 1985, status: 'ACTIVE',
        flow_rate_m3h: 180
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8900, 52.3650], [4.8920, 52.3640], [4.8950, 52.3625]
        ]
      }
    },
    // === Distribution Mains ===
    {
      type: 'Feature',
      properties: {
        id: 'DM-001', name: 'Distribution South East-West',
        type: 'distribution', material: 'DUCTILE_IRON', diameter_mm: 200,
        pressure_bar: 3.8, depth_m: 1.5, length_m: 980,
        install_year: 2005, status: 'ACTIVE',
        flow_rate_m3h: 85
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8770, 52.3620], [4.8800, 52.3621], [4.8830, 52.3620],
          [4.8850, 52.3620], [4.8870, 52.3621], [4.8900, 52.3620],
          [4.8930, 52.3619]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'DM-002', name: 'Distribution North East-West',
        type: 'distribution', material: 'DUCTILE_IRON', diameter_mm: 200,
        pressure_bar: 3.6, depth_m: 1.5, length_m: 980,
        install_year: 2005, status: 'ACTIVE',
        flow_rate_m3h: 78
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8770, 52.3680], [4.8800, 52.3679], [4.8830, 52.3680],
          [4.8850, 52.3680], [4.8870, 52.3679], [4.8900, 52.3680],
          [4.8930, 52.3681]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'DM-003', name: 'Distribution West North-South',
        type: 'distribution', material: 'PVC', diameter_mm: 150,
        pressure_bar: 3.2, depth_m: 1.2, length_m: 890,
        install_year: 2010, status: 'ACTIVE',
        flow_rate_m3h: 52
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8800, 52.3600], [4.8801, 52.3620], [4.8800, 52.3650],
          [4.8799, 52.3680], [4.8800, 52.3700]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'DM-004', name: 'Distribution East North-South',
        type: 'distribution', material: 'PVC', diameter_mm: 150,
        pressure_bar: 3.0, depth_m: 1.2, length_m: 890,
        install_year: 2010, status: 'MAINTENANCE',
        flow_rate_m3h: 0
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8900, 52.3600], [4.8901, 52.3620], [4.8900, 52.3650],
          [4.8899, 52.3680], [4.8900, 52.3700]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'DM-005', name: 'Distribution Mid East-West',
        type: 'distribution', material: 'HDPE', diameter_mm: 150,
        pressure_bar: 3.4, depth_m: 1.3, length_m: 700,
        install_year: 2015, status: 'ACTIVE',
        flow_rate_m3h: 45
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8800, 52.3650], [4.8830, 52.3651], [4.8850, 52.3650],
          [4.8870, 52.3651], [4.8900, 52.3650]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'DM-006', name: 'Abandoned Loop Segment',
        type: 'distribution', material: 'CAST_IRON', diameter_mm: 100,
        pressure_bar: 0, depth_m: 1.0, length_m: 340,
        install_year: 1972, status: 'ABANDONED',
        flow_rate_m3h: 0
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [4.8770, 52.3640], [4.8780, 52.3635], [4.8790, 52.3628],
          [4.8800, 52.3620]
        ]
      }
    },
    // === Service Connections ===
    {
      type: 'Feature',
      properties: {
        id: 'SC-001', name: 'Service Singel 42',
        type: 'service', material: 'PVC', diameter_mm: 32,
        pressure_bar: 2.8, depth_m: 0.8, length_m: 12,
        install_year: 2012, status: 'ACTIVE',
        flow_rate_m3h: 1.2
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8820, 52.3620], [4.8820, 52.3630]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'SC-002', name: 'Service Keizersgracht 88',
        type: 'service', material: 'PVC', diameter_mm: 32,
        pressure_bar: 2.7, depth_m: 0.8, length_m: 12,
        install_year: 2012, status: 'ACTIVE',
        flow_rate_m3h: 1.5
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8870, 52.3620], [4.8870, 52.3630]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'SC-003', name: 'Service Herengracht 15',
        type: 'service', material: 'HDPE', diameter_mm: 25,
        pressure_bar: 2.5, depth_m: 0.8, length_m: 10,
        install_year: 2018, status: 'ACTIVE',
        flow_rate_m3h: 0.8
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8820, 52.3680], [4.8820, 52.3670]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'SC-004', name: 'Service Prinsengracht 120',
        type: 'service', material: 'HDPE', diameter_mm: 25,
        pressure_bar: 2.6, depth_m: 0.8, length_m: 10,
        install_year: 2018, status: 'CLOSED',
        flow_rate_m3h: 0
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8870, 52.3680], [4.8870, 52.3670]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'SC-005', name: 'Service Leidseplein 7',
        type: 'service', material: 'PVC', diameter_mm: 32,
        pressure_bar: 2.9, depth_m: 0.8, length_m: 8,
        install_year: 2014, status: 'ACTIVE',
        flow_rate_m3h: 1.1
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8800, 52.3650], [4.8790, 52.3645]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'SC-006', name: 'Service Museumplein 3',
        type: 'service', material: 'PVC', diameter_mm: 32,
        pressure_bar: 2.4, depth_m: 0.8, length_m: 8,
        install_year: 2014, status: 'ACTIVE',
        flow_rate_m3h: 0.9
      },
      geometry: {
        type: 'LineString',
        coordinates: [[4.8900, 52.3650], [4.8910, 52.3655]]
      }
    }
  ]
};

// --- Valves ---

export const valves = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'GV-001', type: 'Gate Valve', size_mm: 200, status: 'OPEN', install_year: 2005, last_inspection: '2025-03-15' },
      geometry: { type: 'Point', coordinates: [4.8800, 52.3650] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-002', type: 'Gate Valve', size_mm: 400, status: 'OPEN', install_year: 2001, last_inspection: '2025-06-20' },
      geometry: { type: 'Point', coordinates: [4.8850, 52.3650] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-003', type: 'Gate Valve', size_mm: 200, status: 'OPEN', install_year: 2010, last_inspection: '2025-01-10' },
      geometry: { type: 'Point', coordinates: [4.8900, 52.3650] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-004', type: 'Gate Valve', size_mm: 200, status: 'OPEN', install_year: 2005, last_inspection: '2024-11-22' },
      geometry: { type: 'Point', coordinates: [4.8800, 52.3620] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-005', type: 'Gate Valve', size_mm: 150, status: 'CLOSED', install_year: 2010, last_inspection: '2025-08-05' },
      geometry: { type: 'Point', coordinates: [4.8900, 52.3620] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-006', type: 'Gate Valve', size_mm: 200, status: 'OPEN', install_year: 2005, last_inspection: '2025-04-18' },
      geometry: { type: 'Point', coordinates: [4.8800, 52.3680] }
    },
    {
      type: 'Feature',
      properties: { id: 'GV-007', type: 'Gate Valve', size_mm: 150, status: 'OPEN', install_year: 2010, last_inspection: '2025-02-28' },
      geometry: { type: 'Point', coordinates: [4.8900, 52.3680] }
    },
    {
      type: 'Feature',
      properties: { id: 'BV-001', type: 'Butterfly Valve', size_mm: 200, status: 'OPEN', install_year: 2008, last_inspection: '2025-05-12' },
      geometry: { type: 'Point', coordinates: [4.8850, 52.3620] }
    },
    {
      type: 'Feature',
      properties: { id: 'BV-002', type: 'Butterfly Valve', size_mm: 200, status: 'OPEN', install_year: 2008, last_inspection: '2025-07-30' },
      geometry: { type: 'Point', coordinates: [4.8850, 52.3680] }
    },
    {
      type: 'Feature',
      properties: { id: 'PRV-001', type: 'Pressure Reducing Valve', size_mm: 350, status: 'OPEN', install_year: 2003, last_inspection: '2025-09-01', inlet_pressure: 5.2, outlet_pressure: 3.5 },
      geometry: { type: 'Point', coordinates: [4.8830, 52.3650] }
    }
  ]
};

// --- Fire Hydrants ---

export const hydrants = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'FH-001', type: 'Underground', flow_rate_lpm: 1500, status: 'ACTIVE', last_test: '2025-04-10' },
      geometry: { type: 'Point', coordinates: [4.8780, 52.3620] }
    },
    {
      type: 'Feature',
      properties: { id: 'FH-002', type: 'Pillar', flow_rate_lpm: 2000, status: 'ACTIVE', last_test: '2025-03-22' },
      geometry: { type: 'Point', coordinates: [4.8860, 52.3620] }
    },
    {
      type: 'Feature',
      properties: { id: 'FH-003', type: 'Underground', flow_rate_lpm: 1500, status: 'ACTIVE', last_test: '2025-05-08' },
      geometry: { type: 'Point', coordinates: [4.8780, 52.3680] }
    },
    {
      type: 'Feature',
      properties: { id: 'FH-004', type: 'Pillar', flow_rate_lpm: 2000, status: 'ACTIVE', last_test: '2025-06-14' },
      geometry: { type: 'Point', coordinates: [4.8860, 52.3680] }
    },
    {
      type: 'Feature',
      properties: { id: 'FH-005', type: 'Underground', flow_rate_lpm: 1200, status: 'OUT_OF_SERVICE', last_test: '2024-10-30' },
      geometry: { type: 'Point', coordinates: [4.8840, 52.3640] }
    },
    {
      type: 'Feature',
      properties: { id: 'FH-006', type: 'Pillar', flow_rate_lpm: 2000, status: 'ACTIVE', last_test: '2025-07-19' },
      geometry: { type: 'Point', coordinates: [4.8840, 52.3660] }
    }
  ]
};

// --- Water Meters ---

export const meters = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'WM-001', type: 'Residential', customer: 'Singel 42', reading_m3: 1243, last_read: '2025-09-01', status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8820, 52.3630] }
    },
    {
      type: 'Feature',
      properties: { id: 'WM-002', type: 'Residential', customer: 'Keizersgracht 88', reading_m3: 987, last_read: '2025-09-01', status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8870, 52.3630] }
    },
    {
      type: 'Feature',
      properties: { id: 'WM-003', type: 'Residential', customer: 'Herengracht 15', reading_m3: 654, last_read: '2025-08-15', status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8820, 52.3670] }
    },
    {
      type: 'Feature',
      properties: { id: 'WM-004', type: 'Residential', customer: 'Prinsengracht 120', reading_m3: 0, last_read: '2025-01-10', status: 'DISCONNECTED' },
      geometry: { type: 'Point', coordinates: [4.8870, 52.3670] }
    },
    {
      type: 'Feature',
      properties: { id: 'WM-005', type: 'Commercial', customer: 'Leidseplein 7', reading_m3: 8920, last_read: '2025-09-01', status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8790, 52.3645] }
    },
    {
      type: 'Feature',
      properties: { id: 'WM-006', type: 'Commercial', customer: 'Museumplein 3', reading_m3: 15340, last_read: '2025-09-01', status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8910, 52.3655] }
    }
  ]
};

// --- Pump Stations ---

export const pumpStations = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'PS-001', name: 'West Pump Station', capacity_m3h: 500, status: 'RUNNING', pumps: 3, active_pumps: 2, outlet_pressure: 5.5 },
      geometry: { type: 'Point', coordinates: [4.8750, 52.3650] }
    },
    {
      type: 'Feature',
      properties: { id: 'RES-001', name: 'North Reservoir', capacity_m3: 25000, current_level_pct: 78, status: 'ACTIVE' },
      geometry: { type: 'Point', coordinates: [4.8850, 52.3700] }
    }
  ]
};

// --- Layer styling constants ---

export const VALVE_COLOR = [220, 50, 50];
export const VALVE_CLOSED_COLOR = [80, 80, 80];
export const HYDRANT_COLOR = [255, 167, 38];
export const METER_COLOR = [102, 187, 106];
export const PUMP_STATION_COLOR = [156, 39, 176];

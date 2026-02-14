import React, { useState, useCallback, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import {
  pipes, valves, hydrants, meters, pumpStations,
  getPipeColor,
  VALVE_COLOR, VALVE_CLOSED_COLOR, HYDRANT_COLOR, METER_COLOR, PUMP_STATION_COLOR
} from '../data/sampleNetwork';

import Toolbar from './Toolbar';
import LayerPanel from './LayerPanel';
import FeatureInfoPanel from './FeatureInfoPanel';
import Legend from './Legend';

const INITIAL_VIEW_STATE = {
  longitude: 4.885,
  latitude: 52.365,
  zoom: 15,
  pitch: 0,
  bearing: 0,
  minZoom: 10,
  maxZoom: 20
};

// OpenStreetMap raster basemap (no API key needed).
// Replace with Martin vector tile endpoint for production use:
//   e.g. { version: 8, sources: { martin: { type: 'vector', url: 'http://localhost:3000/...' } }, layers: [...] }
const MAP_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '\u00A9 OpenStreetMap contributors'
    }
  },
  layers: [
    { id: 'osm', type: 'raster', source: 'osm' }
  ]
};

function getTooltip({ object }) {
  if (!object) return null;
  const p = object.properties;
  if (!p) return null;
  const lines = [p.id || p.name];
  if (p.type) lines.push(`Type: ${p.type}`);
  if (p.material) lines.push(`Material: ${p.material.replace(/_/g, ' ')}`);
  if (p.diameter_mm) lines.push(`Diameter: ${p.diameter_mm} mm`);
  if (p.status) lines.push(`Status: ${p.status}`);
  return { text: lines.join('\n'), style: { fontSize: '12px' } };
}

export default function NetworkMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [is3D, setIs3D] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [colorBy, setColorBy] = useState('material');
  const [layerVisibility, setLayerVisibility] = useState({
    pipes: true,
    valves: true,
    hydrants: true,
    meters: true,
    pumpStations: true,
    labels: false
  });

  const handleToggle3D = useCallback(() => {
    setIs3D(prev => {
      const next = !prev;
      setViewState(vs => ({
        ...vs,
        pitch: next ? 55 : 0,
        bearing: next ? -15 : 0
      }));
      return next;
    });
  }, []);

  const handleToggleLayer = useCallback((key) => {
    setLayerVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleClick = useCallback((info) => {
    if (info.object) {
      setSelectedFeature({
        ...info.object.properties,
        layerType: info.layer.id
      });
    } else {
      setSelectedFeature(null);
    }
  }, []);

  const layers = useMemo(() => {
    const result = [];

    if (layerVisibility.pipes) {
      result.push(
        new GeoJsonLayer({
          id: 'pipes',
          data: pipes,
          pickable: true,
          stroked: true,
          filled: false,
          lineWidthMinPixels: 2,
          lineWidthMaxPixels: 20,
          getLineWidth: d => {
            const dm = d.properties.diameter_mm;
            if (dm >= 300) return 6;
            if (dm >= 150) return 4;
            return 2;
          },
          getLineColor: d => [...getPipeColor(colorBy, d), 220],
          lineWidthUnits: 'pixels',
          lineCapRounded: true,
          lineJointRounded: true,
          updateTriggers: {
            getLineColor: [colorBy]
          }
        })
      );
    }

    if (layerVisibility.valves) {
      result.push(
        new GeoJsonLayer({
          id: 'valves',
          data: valves,
          pickable: true,
          pointType: 'circle',
          getFillColor: d =>
            d.properties.status === 'CLOSED' ? VALVE_CLOSED_COLOR : VALVE_COLOR,
          getPointRadius: d => {
            const s = d.properties.size_mm;
            if (s >= 300) return 8;
            if (s >= 150) return 6;
            return 5;
          },
          pointRadiusUnits: 'pixels',
          pointRadiusMinPixels: 4,
          getLineColor: [255, 255, 255],
          getLineWidth: 2,
          stroked: true,
          lineWidthUnits: 'pixels'
        })
      );
    }

    if (layerVisibility.hydrants) {
      result.push(
        new GeoJsonLayer({
          id: 'hydrants',
          data: hydrants,
          pickable: true,
          pointType: 'circle',
          getFillColor: d =>
            d.properties.status === 'OUT_OF_SERVICE' ? [158, 158, 158] : HYDRANT_COLOR,
          getPointRadius: 6,
          pointRadiusUnits: 'pixels',
          pointRadiusMinPixels: 4,
          getLineColor: [255, 255, 255],
          getLineWidth: 2,
          stroked: true,
          lineWidthUnits: 'pixels'
        })
      );
    }

    if (layerVisibility.meters) {
      result.push(
        new GeoJsonLayer({
          id: 'meters',
          data: meters,
          pickable: true,
          pointType: 'circle',
          getFillColor: d =>
            d.properties.status === 'DISCONNECTED' ? [158, 158, 158] : METER_COLOR,
          getPointRadius: 4,
          pointRadiusUnits: 'pixels',
          pointRadiusMinPixels: 3,
          getLineColor: [255, 255, 255],
          getLineWidth: 1,
          stroked: true,
          lineWidthUnits: 'pixels'
        })
      );
    }

    if (layerVisibility.pumpStations) {
      result.push(
        new GeoJsonLayer({
          id: 'pumpStations',
          data: pumpStations,
          pickable: true,
          pointType: 'circle',
          getFillColor: PUMP_STATION_COLOR,
          getPointRadius: 10,
          pointRadiusUnits: 'pixels',
          pointRadiusMinPixels: 6,
          getLineColor: [255, 255, 255],
          getLineWidth: 2,
          stroked: true,
          lineWidthUnits: 'pixels'
        })
      );
    }

    return result;
  }, [layerVisibility, colorBy]);

  return (
    <div className="app-container">
      <Toolbar
        is3D={is3D}
        onToggle3D={handleToggle3D}
        showLayerPanel={showLayerPanel}
        onToggleLayerPanel={() => setShowLayerPanel(p => !p)}
        showLegend={showLegend}
        onToggleLegend={() => setShowLegend(p => !p)}
      />

      <div className="main-content">
        <LayerPanel
          visible={showLayerPanel}
          layerVisibility={layerVisibility}
          onToggleLayer={handleToggleLayer}
          colorBy={colorBy}
          onColorByChange={setColorBy}
        />

        <div className="map-container">
          <DeckGL
            viewState={viewState}
            onViewStateChange={({ viewState: vs }) => setViewState(vs)}
            controller={true}
            layers={layers}
            onClick={handleClick}
            getTooltip={getTooltip}
          >
            <Map reuseMaps mapStyle={MAP_STYLE} />
          </DeckGL>

          <Legend
            visible={showLegend}
            colorBy={colorBy}
            layerVisibility={layerVisibility}
          />
        </div>

        <FeatureInfoPanel
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      </div>
    </div>
  );
}

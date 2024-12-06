export const CONSTRUCTION_TYPES = [
  'Brick and Block',
  'Solid Wall (Brick or Stone)',
  'Stone Masonry',
  'Timber Frame',
  'Light Gauge Steel Frame',
  'Structural Steel Framing',
  'Precast Concrete Panels',
  'Structural Insulated Panels (SIPs)',
  'Volumetric Modular Construction',
  'Panelised Systems (Open or Closed Panel)',
  'Cross-Laminated Timber (CLT)',
  'Mass Timber',
  'Hybrid Mixed Materials / Other'
] as const;

export type ConstructionType = typeof CONSTRUCTION_TYPES[number];
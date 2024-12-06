export interface BuildingCategory {
  id: string;
  name: string;
  stages: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
      subitems?: string[];
    }[];
  }[];
}

export const CONSTRUCTION_TYPES: BuildingCategory[] = [
  {
    id: 'brick-and-block',
    name: 'Brick and Block',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'solid-wall',
    name: 'Solid Wall (Brick or Stone)',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'stone-masonry',
    name: 'Stone Masonry',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'timber-frame',
    name: 'Timber Frame',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'light-gauge-steel',
    name: 'Light Gauge Steel Frame',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'structural-steel',
    name: 'Structural Steel Framing',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'precast-concrete',
    name: 'Precast Concrete Panels',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sips',
    name: 'Structural Insulated Panels (SIPs)',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'volumetric-modular',
    name: 'Volumetric Modular Construction',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'panelised-systems',
    name: 'Panelised Systems (Open or Closed Panel)',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'clt',
    name: 'Cross-Laminated Timber (CLT)',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mass-timber',
    name: 'Mass Timber',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'hybrid-mixed',
    name: 'Hybrid Mixed Materials / Other',
    stages: [
      {
        id: 'substructure',
        name: 'Substructure',
        items: [
          {
            id: 'foundations',
            name: 'Foundations',
            subitems: [
              'Strip foundations',
              'Pad foundations',
              'Raft foundations',
              'Piled foundations'
            ]
          }
        ]
      }
    ]
  }
];
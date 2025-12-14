export const LIGHT_MAP_STYLE = [
  // Land
  {
    elementType: "geometry",
    stylers: [{ color: "#f1f3f4" }],
  },

  // Labels
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#5f6368" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f1f3f4" }],
  },

  // Roads
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d6d6d6" }],
  },

  // Highways
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#fefefe" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#b0b4b8" }],
  },

  // Administrative borders
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#cfd3d7" }],
  },

  // Water
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a8d0f0" }],
  },
];

export const DARK_MAP_STYLE = [
  // Land
  {
    elementType: "geometry",
    stylers: [{ color: "#202124" }],
  },

  // Labels
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#e0e0e0" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#202124" }],
  },

  // Roads
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2e2e2e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3b3b3b" }],
  },

  // Highways
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3a3a3a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#5c5c5c" }],
  },

  // Administrative borders
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3a3a3a" }],
  },

  // Water
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#12315a" }],
  },
];

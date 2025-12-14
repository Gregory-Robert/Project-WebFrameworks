import { DARK_MAP_STYLE, LIGHT_MAP_STYLE } from "@/constants/mapStyles";
import { FAKEBANK_LOCATIONS } from "@/constants/fakebankBranches";
import { ThemeContext } from "@/context/ThemeContext";
import MapView, { Marker } from "react-native-maps";
import React, { useRef, useContext } from "react";

const Locations = () => {
  const { theme } = useContext(ThemeContext);

  const mapRef = useRef<MapView | null>(null);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      customMapStyle={theme === "dark" ? DARK_MAP_STYLE : LIGHT_MAP_STYLE}
      initialRegion={{
        latitude: 50.8333,
        longitude: 4.0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
      onMapReady={() => {
        if (mapRef.current) {
          mapRef.current.fitToCoordinates(
            FAKEBANK_LOCATIONS.map((branch) => ({
              latitude: branch.latitude,
              longitude: branch.longitude,
            })),
            {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            }
          );
        }
      }}
    >
      {FAKEBANK_LOCATIONS.map((branch) => (
        <Marker
          key={branch.id}
          coordinate={{
            latitude: branch.latitude,
            longitude: branch.longitude,
          }}
          title={branch.title}
          description={branch.description}
        />
      ))}
    </MapView>
  );
};

export default Locations;

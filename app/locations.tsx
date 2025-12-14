import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { FAKEBANK_LOCATIONS } from "@/constants/fakebankBranches";

const Locations = () => {
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 50.8333,
        longitude: 4.0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
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

import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import DreeProMapMarker from "./DreeProMapMarker";
import "./map.scss";

const DreeMap = ({ currentCoords, dreePros }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQBSzdrH5CCy_ewYtLoxFqmj-oMZcDNxE",
  });

  const [center, setCenter] = useState({ lat: 40.29835602, lng: -111.9617 });
  const [mapRef, setMapRef] = useState();
  useEffect(() => {
    // Update the center when currentCoords change
    if (currentCoords && mapRef) {
      mapRef.panTo(currentCoords)
    }
  }, [currentCoords]);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const drawDreePros = () => {
    if (dreePros) {
      return dreePros.map((dreePro) => (
        <Marker
          key={dreePro.id}
          position={{
            lat: dreePro.address.location.latitude,
            lng: dreePro.address.location.longitude,
          }}
        />
      ));
    }
    return null;
  };

  return (
    <div className="map-container">
      {!isLoaded && !dreePros ? (
        <div
          style={{
            backgroundColor: "#EEE",
            height: "100vh",
            width: "100%",
          }}
        ></div>
      ) : (
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          {drawDreePros()}
        </GoogleMap>
      )}
    </div>
  );
};

export default DreeMap;

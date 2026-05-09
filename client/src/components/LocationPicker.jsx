import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

import { useEffect, useState } from "react";

import L from "leaflet";

/* FIX MARKER */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* RECENTER MAP */

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);

  return null;
}

/* MARKER */

function DraggableMarker({ position, setPosition }) {
  const [markerPosition, setMarkerPosition] = useState(position);

  /* CLICK MAP */

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      const newPos = [lat, lng];

      setMarkerPosition(newPos);

      setPosition({
        lat,
        lng,
      });
    },
  });

  return (
    <Marker
      draggable={true}
      position={markerPosition}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;

          const latlng = marker.getLatLng();

          const newPos = [latlng.lat, latlng.lng];

          setMarkerPosition(newPos);

          setPosition({
            lat: latlng.lat,

            lng: latlng.lng,
          });
        },
      }}
    />
  );
}

export default function LocationPicker({ setPosition }) {
  /* USER LOCATION */

  const [userLocation, setUserLocation] = useState([17.385, 78.4867]);

  /* GET LIVE LOCATION */

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;

        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        setPosition({
          lat,
          lng,
        });
      });
    }
  }, [setPosition]);

  return (
    <div className="overflow-hidden rounded-[24px] mt-4 border border-black/5">
      {/* MAP */}

      <MapContainer
        center={userLocation}
        zoom={16}
        scrollWheelZoom={true}
        style={{
          height: "320px",

          width: "100%",
        }}
      >
        {/* TILES */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* RECENTER */}

        <RecenterMap position={userLocation} />

        {/* DRAG MARKER */}

        <DraggableMarker position={userLocation} setPosition={setPosition} />
      </MapContainer>

      {/* INFO */}

      <div className="bg-white dark:bg-[#151d2d] px-4 py-3">
        <p className="text-xs text-gray-500 leading-5">
          Drag the pin or tap on map to adjust your exact delivery location
        </p>
      </div>
    </div>
  );
}

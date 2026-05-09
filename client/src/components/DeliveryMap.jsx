import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: 17.385,
  lng: 78.4867,
};

export default function DeliveryMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div className="h-[300px] bg-gray-200 rounded-3xl animate-pulse" />;
  }

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl">
      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{
          width: "100%",
          height: "300px",
        }}
      >
        {/* USER */}

        <Marker
          position={{
            lat: 17.385,
            lng: 78.4867,
          }}
        />

        {/* RIDER */}

        <Marker
          position={{
            lat: 17.395,
            lng: 78.4967,
          }}
        />
      </GoogleMap>
    </div>
  );
}

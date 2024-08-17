import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// eslint-disable-next-line react/prop-types
const MapLocation = ({ setAddress }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const geocoderRef = useRef(); 

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.9629, 20.5937],
        zoom: 5,
      });
    }

    if (geocoderRef.current) {
      geocoderRef.current.off("result");
      geocoderRef.current.clear(); 
      geocoderRef.current.onRemove();
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for a location",
      marker: false,
    });

    geocoderRef.current = geocoder;

    geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current));

    geocoder.on("result", (e) => {
      

      let locality, place, state, country, pincode;
      locality = e.result.text;
      e.result.context.forEach((item) => {
        
         if (item.id.includes("place")) {
          place = item.text;
        } else if (item.id.includes("region")) {
          state = item.text;
        } else if (item.id.includes("country")) {
          country = item.text;
        } else if (item.id.includes("postcode")) {
          pincode = item.text;
        }
      });


      setAddress({ locality, place, state, country, pincode });


      mapRef.current.flyTo({
        center: e.result.geometry.coordinates,
        zoom: 15,
        essential: true,
      });
    });

    return () => {

      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [setAddress]);

  return (
    <div className="relative h-64 w-full p-2">
      <div ref={mapContainerRef} className="absolute top-0 left-0 h-full w-full rounded-md" />
      <div 
        ref={geocoderContainerRef} 
        className="absolute top-4 right-4 z-10 w-80"
      />
    </div>
  );
};

export default MapLocation;

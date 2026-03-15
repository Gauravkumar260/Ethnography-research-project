"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet with Next.js/Webpack
const iconUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface CommunityLocation {
  _id: string;
  name: string;
  slug: string;
  mapCoordinates: {
    latitude: number;
    longitude: number;
  };
  location: string;
  heroImage: string;
}

interface CommunityMapProps {
  communities: CommunityLocation[];
}

const CommunityMap = ({ communities }: CommunityMapProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] w-full bg-muted animate-pulse rounded-lg" />;
  }

  // Center of India (approx)
  const center: [number, number] = [20.5937, 78.9629];

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border border-border z-0 relative">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {communities.map((community) => {
          if (
            !community.mapCoordinates ||
            !community.mapCoordinates.latitude ||
            !community.mapCoordinates.longitude
          ) {
            return null;
          }

          return (
            <Marker
              key={community._id}
              position={[
                community.mapCoordinates.latitude,
                community.mapCoordinates.longitude,
              ]}
            >
              <Popup>
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <div className="relative h-32 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={community.heroImage}
                      alt={community.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{community.name}</h3>
                  <p className="text-sm text-gray-600">{community.location}</p>
                  <a
                    href={`/communities/${community.slug}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Profile →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CommunityMap;

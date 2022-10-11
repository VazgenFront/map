import React, { useEffect } from "react";
import { MapContainer, useMapEvent, useMap } from "react-leaflet";
import Leaflet, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder";
import { geocoders, geocoder } from "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useAppSelector } from "../hooks";
import { getSelectedClaim } from "../../app/reducers/claimsSlice";

function RoutingControl(
  points: Leaflet.LatLng[],
  map: Leaflet.Map
): Leaflet.Routing.Control {
  return Leaflet.Routing.control({
    waypoints: points,
    routeWhileDragging: false,
    show: false,
    showAlternatives: false,
    addWaypoints: false,
    fitSelectedRoutes: false,
    collapsible: true,
    geocoder: geocoders.nominatim(),
  })
    .on("routesfound", function (e) {})
    .addTo(map);
}

const SetViewOnClick = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
};

const Map: React.FC = () => {
  const selectedClaim = useAppSelector(getSelectedClaim);
  const map = useMap();

  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  Leaflet.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  geocoder({
    collapsed: false,
  });

  useEffect(() => {
    if (!map) return;

    if (selectedClaim.pointA?.point && selectedClaim.pointB?.point) {
      RoutingControl(
        [
          Leaflet.latLng(selectedClaim.pointA.point as LatLngExpression),
          Leaflet.latLng(selectedClaim.pointB.point as LatLngExpression),
        ],
        map
      );
    }

    return undefined;
  });

  return null;
};

export const MapPanel = () => {
  return (
    <MapContainer center={[40.1512, 44.5102]} zoom={13} scrollWheelZoom={true}>
      <Map />
      <SetViewOnClick />
    </MapContainer>
  );
};

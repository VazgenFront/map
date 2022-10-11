import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = (props: any) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(38.9072, -77.036), L.latLng(37.7749, -122.4194)],
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

import { LatLng, Routing } from 'leaflet';
import React, { useState, useEffect, useRef } from 'react'
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet';
import { Button } from "@material-ui/core";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Base map tile:
const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};


export default function MapView(props: any) {

    const [map, setMap] = useState(null)
    const [routingMachine, setRoutingMachine] = useState<any>(null)


    const ubication = {
        lat: -16.4124,
        lng: -71.5353,
        zoom: 3,
    }

    const { lat, lng, zoom } = ubication;
    const position = new LatLng(lat, lng);

    const start = props.start;
    const setStart = props.setStart;
    const end = props.end;
    const setEnd = props.setEnd;

    const RoutingMachineRef = useRef<any>(null);


    // Create the routing-machine instance:
    useEffect(() => {
        if (!map) return
        if (map) {
            RoutingMachineRef.current = L.Routing.control({
                lineOptions: {
                    styles: [
                        {
                            color: '#757de8',
                        },
                    ],
                    extendToWaypoints: false,
                    missingRouteTolerance: 0
                },
                waypoints: [start, end],
                plan: new L.Routing.Plan([start, end],
                    {
                        createMarker: function (i, wp) {
                            return L.marker(wp.latLng, {
                                draggable: false
                            });
                        }
                    }),
                addWaypoints: false,
                routeWhileDragging: false,
                show: false

            })
            setRoutingMachine(RoutingMachineRef.current)
        }
    }, [map])

    useEffect(() => {
        if (routingMachine) {
            routingMachine.addTo(map)
            routingMachine.setWaypoints([start, end])

        }
    }, [routingMachine, start, end])

    const handleClick = () => {
        if (start.lat === 38.9072) {
            setStart(new LatLng(-16.4141, -71.5433))
            setEnd(new LatLng(-16.4184, -71.4950))
        }
        if (start.lat === 40.7128) {
            setStart(new LatLng(-16.4141, -71.5433))
            setEnd(new LatLng(-16.4184, -71.4950))
        }
    }


    return (
        <>
            <MapContainer
                center={position}
                zoom={zoom}
                style={{ height: "60vh", width: "60%", padding: 0 }}
                whenCreated={(map: any) => setMap(map)}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={maps.base}
                />
            </MapContainer>
        </>
    )
}

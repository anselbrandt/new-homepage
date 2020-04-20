import React from "react";
import { StaticMap } from "react-map-gl";
import { DeckGL, TripsLayer } from "deck.gl";
import trips from "./trips.json";
import { darkPalette } from "./swatchColors";

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

export default function Map(props) {
  const { time, handleViewStateChange, darkMode, themeIndex } = props;

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  };

  const initialViewState = {
    longitude: -73.56459604124136,
    latitude: 45.5061064974249,
    zoom: 13,
    pitch: 60.0,
    bearing: -31.3046875,
  };
  const layers = [
    new TripsLayer({
      id: "trips",
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: hexToRgb(darkPalette[+themeIndex][4]),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength: 1000,
      currentTime: time,
      shadowEnabled: false,
    }),
  ];
  return (
    <div>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        width={"100vw"}
        height={"70vh"}
      >
        {/* <StaticMap
          mapStyle={"mapbox://styles/mappingmtl/ck96f2n00061e1io8c6q5z9im"}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        /> */}
      </DeckGL>
    </div>
  );
}

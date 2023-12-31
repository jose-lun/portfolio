import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot } from "mafs";

function RegularGraph(props) {
  let func = props.func;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;

  return (
    <Mafs
      width={500}
      height={300}
      viewBox={{
        x: [-xrange, xrange],
        y: [minV, maxV],
        padding: 0,
      }}
      preserveAspectRatio={false}
      zoom={true}
    >
      <Coordinates.Cartesian
        xAxis={{
          lines: 1,
          subdivisions: 1,
        }}
        yAxis={{
          lines: 1,
          subdivisions: 1,
        }}
      />
      <Plot.OfX y={(x) => func(x)} />    
    </Mafs>
  );
}

export default RegularGraph;

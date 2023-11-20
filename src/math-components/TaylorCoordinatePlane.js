import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot, useMovablePoint } from "mafs";

function TaylorCoordinatePlane(props) {
  let func = props.func;
  let xrange = props.xrange;
  let taylor = props.taylor;
  let maxV = props.maxV;
  let minV = props.minV;
  let degree = props.degree;

  const phase = useMovablePoint([0, func(0)], {
    constrain: ([x, y]) => [x, func(x)],
    color: "var(--mafs-point)"
  });

  return (
    <Mafs
      width={800}
      height={400}
      viewBox={{
        x: [-xrange, xrange],
        y: [minV, maxV],
        padding: Math.PI / 8,
      }}
      preserveAspectRatio={false}
      zoom={true}
    >
      <Coordinates.Cartesian
        xAxis={{
          lines: Math.PI,
          subdivisions: 4,
          labels: false,
        }}
        yAxis={{
          lines: 0.5,
          labels: false,
        }}
      />
      <Plot.OfX y={(x) => func(x)} />
      <Plot.OfX y={(x) => taylor(x, degree, phase.x)} color="var(--mafs-approx)" />
      

      {phase.element}
    </Mafs>
  );
}
//<Plot.OfX y={(x) => Math.sin(phase.x)+Math.cos(phase.x)*(x-phase.x)} color="var(--mafs-approx)"/>

// function half(n) {
//   if (n % 1 == 0) {
//     return n;
//   }
// }

export default TaylorCoordinatePlane;

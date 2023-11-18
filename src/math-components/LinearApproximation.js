import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot, Text, useMovablePoint, Point, Line } from "mafs";
import * as math from "mathjs";

function LinearApproximation(props) {
  let func = props.func;
  let funcString = props.funcString;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;
  let initialx = props.initialx;
  let approxx = props.approxx;
  const deriv = math.derivative(funcString, "x");

  const phase = useMovablePoint([initialx, func(initialx)], {
    constrain: ([x, y]) => [x, func(x)],
    color: "var(--mafs-point)"
  });

//   const point1 = useMovablePoint([approxx, func(approxx)], {
//     constrain: ([x, y]) => [approxx, func(approxx)]
//   })

//   const point2 = useMovablePoint([approxx, linApprox(approxx)], {
//     constrain: "vertical",
//   })

  function linApprox(x) {
    const evalderiv = deriv.evaluate({ x: phase.x });
    return func(phase.x) + evalderiv*(x-phase.x);
  }

  function approximationError() {
      return Math.abs(func(approxx) - linApprox(approxx));
  }

  // DERIVATIVE CALCULATIONS
  

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
          lines: 2,
          subdivisions: 2,
          labels: false,
        }}
        yAxis={{
          lines: 2,
          subdivisions: 2,
          labels: false,
        }}
      />
      <Plot.OfX y={(x) => func(x)} />
      <Plot.OfX y={(x) => linApprox(x)} color="var(--mafs-approx)"/>
      {phase.element}
      <Point x={approxx} y={func(approxx)} color="var(--mafs-approxPoint)"/>
      <Point x={approxx} y={linApprox(approxx)} color="var(--mafs-approxPoint)"/> 
      <Line.Segment 
        point1={[approxx, func(approxx)]}
        point2={[approxx, linApprox(approxx)]}
        color="var(--mafs-approxPoint)"
      />
      <Text attach="e" x={-2.9} y={1.2} size={12}>
          Approximation Error: 
        </Text>

        <Text attach="e" x={-1.8} y={0.7} size={30} color="var(--mafs-approxPoint)">
          {approximationError().toFixed(2)}
        </Text>
    </Mafs>
  );
}

export default LinearApproximation;

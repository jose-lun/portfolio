import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot, Text, useMovablePoint, Point, Line } from "mafs";
import * as math from "mathjs";

function QuadraticApproximation(props) {
  let func = props.func;
  let funcString = props.funcString;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;
  let initialx = props.initialx;
  let approxx = props.approxx;
  let labels = props.labels;
  const deriv = math.derivative(funcString, "x");
  const deriv2 = math.derivative(deriv, "x");

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

  function quadApprox(x) {
    const evalderiv = deriv.evaluate({ x: phase.x });
    const evalderiv2 = deriv2.evaluate({ x: phase.x });
    return func(phase.x) + evalderiv*(x-phase.x) + evalderiv2*((x-phase.x)**2)/2;
  }

  function approximationError() {
      return Math.abs(func(approxx) - quadApprox(approxx));
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
      zoom={false}
    >
      <Coordinates.Cartesian
        xAxis={{
          lines: 2,
          subdivisions: 2,
          labels: labels,
        }}
        yAxis={{
          lines: 2,
          subdivisions: 2,
          labels: labels,
        }}
      />
      <Plot.OfX y={(x) => func(x)} />
      <Plot.OfX y={(x) => quadApprox(x)} color="var(--mafs-approx)"/>
      {phase.element}
      <Point x={approxx} y={func(approxx)} color="var(--mafs-approxPoint)"/>
      <Point x={approxx} y={quadApprox(approxx)} color="var(--mafs-approxPoint)"/> 
      <Line.Segment 
        point1={[approxx, func(approxx)]}
        point2={[approxx, quadApprox(approxx)]}
        color="var(--mafs-approxPoint)"
      />
      <Text attach="e" x={-6} y={2.3} size={20}>
          Approximation Error: 
      </Text>

      <Text attach="e" x={-1.1} y={2.3} size={22} color="var(--mafs-approxPoint)">
          {approximationError().toFixed(2)}
      </Text>
      <Text attach="e" x={-6} y={-2.5} size={20}>
          x₀ = {phase.x.toFixed(2)}
      </Text>
    </Mafs>
  );
}

export default QuadraticApproximation;

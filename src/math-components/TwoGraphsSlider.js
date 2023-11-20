import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot } from "mafs";

// only difference from TwoGraphs is that the second function has a slider variable
function TwoGraphsSlider(props) {
  let funcs = props.funcs;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;
  let labels = props.labels;
  let numTerms = props.numTerms;

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
          labels: labels
        }}
        yAxis={{
          lines: 2,
          subdivisions: 2,
          labels: labels
        }}
      />
      <Plot.OfX y={(x) => funcs[0](x)} />   
      <Plot.OfX y={(x) => funcs[1](x, numTerms)} color="var(--mafs-approx)"/>   
    </Mafs>
  );
}

export default TwoGraphsSlider;

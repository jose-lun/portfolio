import React from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot, useStopwatch } from "mafs";

function ParametricPlot(props) {
  let xfunc = props.xfunc;
  let yfunc = props.yfunc;
  let trange = props.trange;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;
  const { time, start } = useStopwatch()
  React.useEffect(() => start(), [start])

  return (
    <Mafs
      width={300}
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
          subdivisions: 4,
          labels: false,
        }}
        yAxis={{
          lines: 1,
          subdivisions: 4,
          labels:false,
        }}
      />
      <Plot.Parametric
        t={[-(time%6), time%6]}
        xy={(t) => [yfunc(t), xfunc(t)]}
        color={'#98a5df'}
      />
    </Mafs>
  );
}

export default ParametricPlot;

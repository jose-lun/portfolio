import { React, useState }from "react";
import "../styles/TaylorPolynomials.css";
import { Mafs, Coordinates, Plot } from "mafs";

function ParametricPlotSlider(props) {
  let xfunc = props.xfunc;
  let yfunc = props.yfunc;
  let xrange = props.xrange;
  let maxV = props.maxV;
  let minV = props.minV;
  const [parameter, setParameter] = useState(-8)

  return (
    <div>
        <div className="bigmath">
        <span>P = </span>{parameter}
      </div>
      <div>
        <input
          type="range"
          min={-8}
          max={8}
          step={0.1}
          value={parameter}
          onChange={(event) => setParameter(event.target.value)}
        />
      </div>
      <Mafs
      width={300}
      height={300}
      viewBox={{
        x: [-xrange, xrange],
        y: [minV, maxV],
        padding: 0,
      }}
      preserveAspectRatio={false}
      zoom={false}
      pan={false}
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
        t={[-8, parameter]}
        xy={(t) => [yfunc(t), xfunc(t)]}
        color={'#98a5df'}
      />

    </Mafs>
    </div>
  );
}

export default ParametricPlotSlider;

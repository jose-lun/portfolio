import React, { useState } from "react";
import "../styles/TaylorPolynomials.css";
import TwoGraphsParameterized from "./TwoGraphsParameterized";


function FresnelApproximation() {
  // FUNCTION INFORMATION

  const [numTerms, setNumTerms] = useState(1);

  var fresnel = require( '@stdlib/math-base-special-fresnel' );
  function fresnelx(x) {
    let inner = Math.sqrt(2/Math.PI) * x;
    let outermultiplier = Math.sqrt(Math.PI/2);
    return fresnel(inner)[0]*outermultiplier;
  }

  function factorial(x) {
    return (x > 1) ? x * factorial(x-1) : 1;
  }

  function fresnelApprox(x, l) {
    let total = 0;
    for (let n = 0; n <= l; n++) {
      let numerator = Math.pow(-1, n) * Math.pow(x, (4 * n) + 3);
      let denominator = factorial((2 * n) + 1) * ((4 * n) + 3);
      
      total += parseFloat(numerator) / parseFloat(denominator);
    }
    if (total >= 4) {
      total = 4;
    } else if (total <= -4) {
      total = -4;
    }
    return total;
  } 

  return (
    <div>
      <div className="bigmath">
        <span>Number of Terms = </span>{numTerms}
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={numTerms}
          onChange={(event) => setNumTerms(event.target.value)}
        />
      </div>
      <TwoGraphsParameterized
        funcs={[fresnelx, fresnelApprox]}
        xrange={5}
        maxV={3}
        minV={-3}
        labels={false}
        numTerms={numTerms-1}
      />
    </div>
  );
}

export default FresnelApproximation;

import React, { useState } from "react";
import "../styles/TaylorPolynomials.css";
import TwoGraphsParameterized from "./TwoGraphsParameterized";


function FresnelApproximation() {
  // FUNCTION INFORMATION

  const [numTerms, setNumTerms] = useState(3);

  var fresnel = require( '@stdlib/math-base-special-fresnel' );
  function fresnelx(x) {
    return fresnel(x)[0];
  }

  function factorial(x) {
    return (x > 1) ? x * factorial(x-1) : 1;
  }

  function fresnelApprox(x, l) {
    let total = 0;
    for (let n = 0; n <= l; n++) {
      let numerator = Math.pow(-1, n) * Math.pow(x, 4 * n + 3);
      let denominator = factorial(4 * n + 3) * factorial(2 * n + 1);
      
      total += numerator / denominator;
    }
    return total;
  } 

  return (
    <div>
      <TwoGraphsParameterized
        funcs={[fresnelx, fresnelApprox]}
        xrange={5}
        maxV={3}
        minV={-3}
        labels={false}
        numTerms={numTerms}
      />
    </div>
  );
}

export default FresnelApproximation;

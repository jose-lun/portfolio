import React, { useState, useEffect } from "react";
import "../styles/TaylorPolynomials.css";
import TaylorCoordinatePlane from "./TaylorCoordinatePlane.js";
import * as math from "mathjs";
import { processLatex } from "../helpers/LatexProcessing";
import ReactModal from "react-modal";
import { mathy } from "../helpers/formattingHelpers"

function TaylorPolynomials() {
  // FUNCTION INFORMATION

  const [cortex, setCortex] = useState("\\sin(x)");
  const processedCortex = processLatex(cortex);

  const [funcString, setFuncString] = useState(processedCortex);
  const [parseError, setParseError] = useState(false);
  const [degreeError, setDegreeError] = useState(false);

  const numDerivatives = 5;

  // INITIAL VALUES

  const node1 = math.parse(funcString);
  const node2 = node1.compile();
  const defaultFunction = function (arg) {
    return node2.evaluate({ x: arg });
  };

  let d = [];
  let currentFunc = funcString;
  let nextFunc = "";
  for (let i = 1; i < numDerivatives + 1; i++) {
    nextFunc = math.derivative(currentFunc, "x");
    d.push(nextFunc);
    currentFunc = nextFunc;
  }

  // let testNode = math.parse('log(x, e)');
  // testNode = testNode.compile();
  // testNode = testNode.evaluate({x: Math.E**2});
  // console.log(testNode);

  // INITIALIZE STATES

  const [func, setFunc] = useState(() => defaultFunction);
  const [derivatives, setDerivatives] = useState(d);
  const [intermediateDegree, setIntermediateDegree] = useState(1);
  const [degree, setDegree] = useState(1);

  const xrange = 2 * Math.PI;
  const limit = 10000;

  // RUN EACH TIME GRAPH BUTTON IS CLICKED

  useEffect(() => {
    let d2 = [];
    let currentFunc2 = funcString;
    let nextFunc2 = "";

    for (let i = 1; i < numDerivatives + 1; i++) {
      nextFunc2 = math.derivative(currentFunc2, "x");
      d2.push(nextFunc2);
      currentFunc2 = nextFunc2;
    }
    setDerivatives(d2);

    const node1 = math.parse(funcString);
    const node2 = node1.compile();
    const func = function (arg) {
      return node2.evaluate({ x: arg });
    };
    setFunc(() => func);
  }, [funcString]);

  // HELPER FUNCTIONS

  // FINDS MINIMUM VALUE OF FUNCTION IN XRANGE

  // function minValue() {
  //   let minV = 0;
  //   for (let i = -xrange; i <= xrange; i += 0.5) {
  //     if (func(i) < minV) {
  //       minV = func(i);
  //     }
  //   }
  //   return Math.max(minV - 2, -10);
  // }

  // FINDS MAXIMUM VALUE OF FUNCTION IN XRANGE
  // function maxValue() {
  //   let maxV = 0;
  //   for (let i = -xrange; i <= xrange; i += 0.5) {
  //     if (func(i) > maxV) {
  //       maxV = func(i);
  //     }
  //   }
  //   return Math.min(maxV + 2, 10);
  // }

  // TAYLOR APPROXIMATION FOR FUNCTION OF Nth DEGREE
  function taylor(arg, degree, a) {
    let f = func(a);

    let total = f;
    for (let i = 0; i < degree; i++) {
      total +=
        derivatives[i].evaluate({ x: a }) *
        ((arg - a) ** (i + 1) / math.factorial(i + 1));
    }
    return total;
  }

  // TESTS WHETHER FUNCTION CAN BE COMPILED & HAS NO ASYMPTOTES
  function acceptableString(str, limit) {
    let node;
    let testPoint;
    try {
      node = math.compile(processLatex(str));
      //console.log(node.json);
    } catch (error) {
      console.error(error);
      return false;
    }
    for (let i = -xrange; i <= xrange; i += 0.1) {
      try {
        testPoint = Math.abs(node.evaluate({ x: i }));
        if (testPoint > limit) {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return true;
  }

  function acceptableDegree(d) {
    return (d < numDerivatives+1 && d > 0);
  }

  // HANDLER FUNCTIONS

  function handleButtonClick() {
    if (acceptableString(cortex, limit) && acceptableDegree(intermediateDegree)) {
      setParseError(false);
      setDegreeError(false);
      setFuncString(processLatex(cortex));
      setDegree(intermediateDegree);
    } else if (acceptableDegree(intermediateDegree)) {
      setDegree(intermediateDegree);
      setParseError(true);
    } else if (acceptableString(cortex, limit)) {
      setFuncString(processLatex(cortex));
      setDegreeError(true);
    } else {
      setParseError(true);
    }
  }

  // RETURN STATEMENT

  return (
    <div>
      <p className="function-input"> {mathy('f(x) = ')}
      <math-field onInput={(e) => setCortex(e.target.value)}
      >
        {cortex}
      </math-field>
      degree = 
      <math-field 
      onInput={(e) => setIntermediateDegree(e.target.value)}>
        {intermediateDegree}
      </math-field>
      <button
        onClick={() => {
          handleButtonClick();
        }}
      >
        Graph
      </button>
      </p>
      <ReactModal
        isOpen={parseError}
        contentLabel="Unacceptable Modal"
        ariaHideApp={false}
        onRequestClose={() => setParseError(false)}
        className="modal"
      >
        Function cannot be parsed. Please restrict to only elementary functions
        (including polynomials, trigonometric functions, and exponentials) and
        avoid functions with asymptotes.
      </ReactModal>
      <ReactModal
        isOpen={degreeError}
        contentLabel="Unacceptable Modal"
        ariaHideApp={false}
        onRequestClose={() => setDegreeError(false)}
        className="modal"
      >
        Degree must be between 1 and 5.
      </ReactModal>
      <TaylorCoordinatePlane
        func={func}
        funcString={funcString}
        xrange={xrange}
        maxV={5}
        minV={-5}
        taylor={taylor}
        degree={degree}
      />
    </div>
  );
}

export default TaylorPolynomials;

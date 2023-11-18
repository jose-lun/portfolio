import React from "react";
import { useParams } from "react-router-dom";
import {ProjectList} from "../helpers/ProjectList";
import "../styles/ProjectDisplay.css";
import TaylorPolynomials from "../pages/Experiments";
import 'katex/dist/katex.min.css';
import ParametricPlot from "../math-components/ParametricPlot";
import LinearApproximation from "../math-components/LinearApproximation";
import { ital, bold, boldital, mathy, latexblock } from "../helpers/formattingHelpers";
import TwoGraphs from "../math-components/TwoGraphs";

function ProjectDisplay() {
  const { id } = useParams();
  const project = ProjectList[id];

  // LATEX STRINGS

  const fresnelIntegral = `S(x) = \\int_{0}^{x} \\sin\\left(t^2\\right) \\, dt`;
  const sinDerivative = `f'(0) = \\frac{d}{dx}\\sin\\left(x\\right)\\vert_{x=0} = \\cos\\left(0\\right) = 1`;
  const sinEvaluation = `f(0) = \\sin\\left(0\\right) = 0`;

  // FRESNEL FUNCTIONS

  var fresnel = require( '@stdlib/math-base-special-fresnel' );
  function fresnelx(x) {
    return fresnel(x)[0];
  }

  function fresnely(x) {
    return fresnel(x)[1];
  }

  // LINEAR APPROXIMATIONS

  function func2(x) {
    return Math.sin(x**2);
  }

  function sinTangent(x) {
    return x;
  }

  // CONTENT

  return <div className="project">
      <h1>
          {project.name}
      </h1>

      <div className="lesson">
        <p> In this lesson, we will explore the intuition behind the Taylor Series, a concept that is fundamental to math and science.
        As a motivating example, let's consider the following function, known as a <a href="https://en.wikipedia.org/wiki/Fresnel_integral" target="_blank">Fresnel Integral</a>:
        </p>

        {latexblock(fresnelIntegral)}

        <p>This function has many uses in physics, from calculating electromagnetic diffraction,
          to highway engineering, rollercoaster design, and drawing this <a href="https://en.wikipedia.org/wiki/Euler_spiral" target="_blank">cool spiral</a>:</p> 
      </div>

      <div className="math">
        <ParametricPlot
        xfunc={fresnelx}
        yfunc={fresnely}
        xrange={1}
        trange={8}
        maxV={1}
        minV={-1}
        />
      </div>

      <div className="lesson">

        <p> But how do we actually evaluate it?</p>

        <p>The problem is, in order to test some values of this function, we need to compute the integral.
          We could try finding the {ital('indefinite integral')} — via U-substitution, partial fractions, integration by parts, etc. — then 
          evaluating at the endpoints to get a number. However, this turns out 
          this is <a href="https://en.wikipedia.org/wiki/Nonelementary_integral" target="_blank">an impossible task. </a>
        </p>

        <p>So are we doomed? Well, if we can't find an exact solution to this integral, the next best thing
          is to {bold('approximate')} it.
          If we can find a polynomial that matches {mathy('\\sin(x²)')} closely, then 
          we can take the integral of this polynomial instead of {mathy('\\sin(x²)')}.
        </p>

        <p>
        Let's consider the general case of approximating a function {mathy('f(x)')} by a polynomial, starting with the simplest case: linear approximations.
        </p>

        <h1>
          Linear Approximations
        </h1>

        <p>
          You may be familiar with linear approximations, also known as {ital('tangent line approximations')}.
          They consist of finding a line that matches the function value and the function slope at some point.
        </p>

        <p>
          Take, for example, the function {mathy('f(x) = \\sin(x)')}. To find a linear approximation for {mathy('\\sin(x)')} centered
          at {mathy('x = 0')}, we first take the derivative of {mathy('\\sin(x)')} and evaluate it at {mathy('x = 0')} to find the slope:
        </p>
        {latexblock(sinDerivative)}

        <p>
          We also evaluate the function itself at {mathy('x = 0')} to find our matching point:
        </p>
        {latexblock(sinEvaluation)}
        <p>
          Now, given the point {mathy('(0, 0)')} and a slope of {mathy('1')}, our equation for the tangent line will be {mathy('T(x) = x')}.
          You can see below that it does indeed provide a (very) rough approximation for our original function {mathy('f(x) = \\sin(x)')} in the neighborhood of {mathy('x = 0')}:
        </p>
        {/* <p>  
          and then use 
          <a href="https://www.mathsisfun.com/algebra/line-equation-point-slope.html" target="_blank">point slope form</a> to find the 
          equation of the tangent line.
        </p> */}
      </div>
      <div className="math">
          <TwoGraphs
            funcs={[Math.sin, sinTangent]}
            xrange={Math.PI * 2}
            maxV={1.8}
            minV={-1.8}
          />
      </div>

      {/* <div className="math">
        <LinearApproximation
        func={Math.sin}
        funcString={"sin(x)"}
        initialx={0}
        approxx={1.5}
        xrange={3}
        maxV={2}
        minV={-2}
        />
      </div> */}

      {/* <div className="math">
        <TaylorPolynomials />
      </div> */}

  </div>;
}

export default ProjectDisplay;

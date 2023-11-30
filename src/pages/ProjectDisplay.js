import React from "react";
import { useParams } from "react-router-dom";
import {ProjectList} from "../helpers/ProjectList";
import "../styles/ProjectDisplay.css";
import TaylorPolynomials from "../math-components/TaylorPolynomials";
import 'katex/dist/katex.min.css';
import ParametricPlot from "../math-components/ParametricPlot";
import LinearApproximation from "../math-components/LinearApproximation";
import { ital, bold, mathy, latexblock } from "../helpers/formattingHelpers";
import TwoGraphs from "../math-components/TwoGraphs";
import QuadraticApproximation from "../math-components/QuadraticApproximation";
import FresnelApproximation from "../math-components/FresnelApproximation";
import ParametricPlotSlider from "../math-components/ParametricPlotSlider";

function ProjectDisplay() {
  const { id } = useParams();
  const project = ProjectList[id];

  // LATEX STRINGS

  const fresnelIntegral = `S(x) = \\int_{0}^{x} \\sin\\left(t^2\\right) \\, dt`;
  const sinDerivative = `f'(0) = \\frac{d}{dx}\\sin\\left(x\\right)\\vert_{x=0} = \\cos\\left(0\\right) = 1`;
  const sinEvaluation = `f(0) = \\sin\\left(0\\right) = 0`;
  const sinEvaluationX0 = `f(x_0) = \\sin\\left(x_0\\right)`;
  const sinDerivativeX0 = `f'(x_0) = \\frac{d}{dx}\\sin\\left(x\\right)\\vert_{x=x_0} = \\cos\\left(x_0\\right)`;
  const tangentLineX0 = `T(x) = \\sin\\left(x_0\\right) + \\cos\\left(x_0\\right) \\cdot \\left(x-x_0\\right)`;
  const tangentLineGeneral = `T(x) = f\\left(x_0\\right) + f'\\left(x_0\\right) \\cdot \\left(x-x_0\\right)`;

  const TxDerivative = `T'(x) = \\frac{d}{dx} [f\\left(x_0\\right) + f'\\left(x_0\\right) \\cdot \\left(x-x_0\\right)]`;
  const TxDerivative2 = `\\hspace{3cm} = \\frac{d}{dx} [f(x_0)] + \\frac{d}{dx} [f'(x_0) \\cdot x]  - \\frac{d}{dx} [f'(x_0) \\cdot x_0]`;
  const TxDerivative3 = ` = \\frac{d}{dx} [f'(x_0) \\cdot x] = f'(x_0) \\hspace{0.1cm}`;

  const TxSecondOrder = `T_{2}(x) = f\\left(x_0\\right) + f'\\left(x_0\\right) \\cdot \\left(x-x_0\\right) + \\frac{f''(x_0) \\cdot (x-x_0)^2}{2}`
  const TxThirdOrder = `T_{3}(x) = f\\left(x_0\\right) + f'\\left(x_0\\right) \\cdot \\left(x-x_0\\right) + \\frac{f''(x_0) \\cdot (x-x_0)^2}{2} + \\frac{f'''(x_0) \\cdot (x-x_0)^3}{6}`
  const TxNthOrder = `T_{n}(x) = f\\left(x_0\\right) + f'\\left(x_0\\right) \\cdot \\left(x-x_0\\right) + \\frac{f''(x_0) \\cdot (x-x_0)^2}{2} + ... + \\frac{f^{(n)}(x_0) \\cdot (x-x_0)^n}{n!}`
  // FRESNEL FUNCTIONS

  var fresnel = require( '@stdlib/math-base-special-fresnel' );
  function fresnelx(x) {
    return fresnel(x)[0];
  }

  function fresnely(x) {
    return fresnel(x)[1];
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

        <p>
          {ital('Note: this lesson assumes an understanding of polynomials, trigonometric functions, simple calculus and parameterization.')}
        </p>

        <p> 
        The Taylor Series is a concept that is fundamental to modern math and science. But too often, it is introduced as an abstract formula,
        with little or no explanation of why it works and why it's even important. In this lesson,
        we will explore the intuition and motivation behind the Taylor Series, constructing the formula from the ground up.
        As a motivating example, consider the following function, known as a <a href="https://en.wikipedia.org/wiki/Fresnel_integral" target="_blank" rel="noreferrer">Fresnel Integral</a>:
        </p>

        {latexblock(fresnelIntegral)}

        <p>This function has many uses in physics, from calculating electromagnetic diffraction,
          to highway engineering, rollercoaster design, and drawing this <a href="https://en.wikipedia.org/wiki/Euler_spiral" target="_blank" rel="noreferrer">cool spiral</a>:</p> 
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
          evaluating at the endpoints to get a number. However, it turns out 
          this is <a href="https://en.wikipedia.org/wiki/Nonelementary_integral" target="_blank" rel="noreferrer">an impossible task. </a>
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
          They consist of finding a line that matches the function's value and the function's slope at some point.
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
            maxV={3}
            minV={-3}
            labels={false}
            pan={false}
            zoom={false}
          />
      </div>

      <div className="lesson">
        <p>
          What if wanted to approximate the function around a different neighborhood?
          By the same process, we can evaluate the function and slope at {mathy('x = x_0')}:
        </p>

        {latexblock(sinEvaluationX0)}
        {latexblock(sinDerivativeX0)}

        <p>
          Then, using <a href="https://www.mathsisfun.com/algebra/line-equation-point-slope.html" target="_blank" rel="noreferrer">point slope form</a>,
          we find that the equation of the tangent line approximation centered at {mathy('x=x_0')} is:
        </p>

      {latexblock(tangentLineX0)}

      <p>
          We can test this by attempting to approximate the function at {mathy('x=1.5')}. Let's plot {mathy('T(x)')} and see how
          our choice of {mathy('x_0')} affects our approximation error:
      </p>
      </div>

      <div className="math">
        <LinearApproximation
        func={Math.sin}
        funcString={"sin(x)"}
        initialx={0}
        approxx={1.5}
        xrange={Math.PI * 2}
        maxV={3}
        minV={-3}
        labels={false}
        />
      </div>

      <div className="lesson">
        <p>
          In general, the equation for a tangent-line approximation to a function {mathy('f(x)')} centered at the point {mathy('x=x_0')} is:
        </p>

        {latexblock(tangentLineGeneral)}

        <p>
          If you're wondering why we need the term {mathy('(x-x_0)')}, note that all this does is shift our line {mathy('x_0')} units to the right,
           to center it at the appropriate point.
        </p>

        <p>
          But can we do better?
          Remember, our ultimate goal is to evaluate the integral {mathy('\\int_{0}^{x} \\sin\\left(t^2\\right) \\, dt')}. 
          In order to get accurate values, we need an accurate approximation for {mathy('\\sin(x)')}, and straight lines just aren't gonna cut it.
        </p>

        <h1>
          Higher-Order Approximations
        </h1>

        <p>
          To obtain a linear approximation, we found a line that matched the function's value and slope at a certain point. But
          most functions aren't straight lines — they have {ital('curvature')}.
          
        </p>
        <p>
          The curvature
          of a function can be attributed to its {bold('second derivative')}. If we could 
          find a polynomial whose first {ital('and')} second derivative matched our function's at a certain point, this would
          provide a much better approximation.
        </p>

        <p>
          Note that our current approximation {mathy("T(x) = f(x_0) + f'(x_0) \\cdot (x-x_0)")} has the same first derivative {ital('everywhere')} as our function's first derivative {ital('at')} {mathy('x_0')}:
        </p>

        {latexblock(TxDerivative)}
        {latexblock(TxDerivative2)}
        {latexblock(TxDerivative3)}

        <p>
          But since {mathy("f'(x_0)")} is just a {ital('number')}, our second derivative is simply {mathy('0')}:
        </p>

        {latexblock(`T''(x) = \\frac{d}{dx} f'(x_0) = 0`)}

        <p>
          If we want our polynomial to have a non-zero second derivative, we can add an {mathy('x^2')} term 
          (or a {mathy('(x-x_0)^2')} term to account for the horizontal shift). Then our second derivative will 
           be {mathy('\\frac{d^{2}x}{dx^{2}}(x-x_0)^2 = 2')}.
        </p>

        <p>
          To ensure our second derivative is equal to {mathy("f''(x_0)")}, we simply divide our {mathy('(x-x_0)^2')} term by 2 and multiply 
          by {mathy("f''(x_0)")}, giving us this final equation:
        </p>

        {latexblock(TxSecondOrder)}

        <p>
          Success! Go ahead and check for yourself that {mathy("T_{2}''(x) = f''(x_0)")}. Let's see how this improved approximation 
          does on our {mathy('\\sin(x)')} function:
        </p>

      </div>

      <div className="math">
        <QuadraticApproximation
        func={Math.sin}
        funcString={"sin(x)"}
        initialx={0}
        approxx={1.5}
        xrange={Math.PI * 2}
        maxV={3}
        minV={-3}
        labels={false}
        />
      </div>

      <div className="lesson">

      <p>
        Clearly this polynomial does a better job of approximating our function, but why stop here? 
        By the same logic as before, we can add a {mathy('(x-x_0)^3')} term to match our third derivative. This would give us a third derivative of:
      </p>

      {latexblock(`T^{(3)}(x) = \\frac{d^{3}x}{dx^{3}} (x-x_0)^3`)}
      {latexblock(`\\hspace{1.35cm} = \\frac{d^{2}x}{dx^{2}} 3(x-x_0)^2`)}
      {latexblock(`\\hspace{1.7cm} = \\frac{d}{dx} 6(x-x_0) = 6`)}

      <p>
       And so, our "third-order" approximation becomes:
      </p>

      {latexblock(TxThirdOrder)}
      
      <p>
       We can generalize this to match the {mathy('n^{th}')} derivative, yielding this
       general formula:
      </p>

      {latexblock(TxNthOrder)}

      <p>
        This is known as the {ital('nth Taylor Polynomial')} of {mathy('f(x)')}. If you're confused about the {mathy('n!')} term, consider how you 
        would find the {mathy('n^{th}')} derivative of {mathy('(x-x_0)^n')}, and how you could normalize this term to produce an {mathy('n^{th}')} derivative of {mathy('f^{(n)}(x_0)')}.
      </p>

      <p>
        This incredible formula allows us to 
        approximate {ital('any')} function to an arbitrary degree of accuracy by a polynomial. Go ahead and try it out below!
        You can plot any (well-behaved) function and see how its Taylor Polynomials of various degrees look.
      </p>
      </div>

      <div className="math">
        <TaylorPolynomials />
      </div>

      <div className="lesson">

        <h1>
          Taylor Series
        </h1>

        <p>
          One natural question to ask at this point is, {ital('how far can we take this?')} So far, we've defined a polynomial that matches
          up to {mathy('n')} derivatives of a function. But what if we matched them all? For an infinitely-differentiable function 
          like {mathy('\\sin(x)')}, this would mean taking the limit of our expression as {mathy('n \\to \\infty')}:
        </p>

        {latexblock(`\\lim_{n \\to \\infty} T_{n}(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)(x-x_0)^n}{n!}`)}

        <p>
          This is known as the {ital('Taylor Series')} of {mathy('f(x)')}. For <a href="https://en.wikipedia.org/wiki/Entire_function" target="_blank" rel="noreferrer">most functions</a>, this series will
          exactly equal our original function, {ital('regardless of where we center it')}. So we can do away with our clunky {mathy('(x-x_0)')} notation and just center our
          series at 0. Then, we can write
        </p>

        {latexblock(`f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0) \\hspace{0.1cm} x^n}{n!}`)}

        <h1>
          Evaluating the Fresnel Integral
        </h1>

        <p>
          Let's remind ourselves of the original problem from the beginning of the lesson. We have the following function, which we cannot evaluate as it currently stands:
        </p>

        {latexblock(fresnelIntegral)}

        <p>
          Using our new approximation superpowers, we can replace {mathy('\\sin(t^2)')} in our integral by the Taylor Series of {mathy('\\sin(t^2)')}. To find this, 
          we will start with the Taylor Series for {mathy('\\sin(t)')} and replace {mathy('t')} with {mathy('t^2')}.
        </p>
        <p>
          Finding a closed-form expression for the Taylor Series of a specific function can be time-consuming, but I recommend that you calculate the series 
          for {mathy('\\sin(x)')} on your own (by taking successive derivatives of {mathy('\\sin(t)')} and plugging in {mathy('0')}, you will see a pattern 
          emerge).
        </p>

        <p>
          For now, we will skip the derivation and present the series:
        </p>

        {latexblock(`\\sin(t) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n} \\hspace{0.1cm} t^{2n+1}}{(2n+1)!}`)}

        <p>
          Replacing {mathy('t')} with {mathy('t^2')}:
        </p>

        {latexblock(`\\sin(t^2) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n} \\hspace{0.1cm} (t^2)^{2n+1}}{(2n+1)!} = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n} \\hspace{0.1cm} t^{4n+2}}{(2n+1)!}`)}

        <p>
          This may look intimidating, but if we expand out the terms, we see it's actually quite a simple pattern:
        </p>

        {latexblock(`\\sin(t^2) = \\frac{x^2}{1!} + \\frac{x^6}{3!} + \\frac{x^{10}}{5!} + \\frac{x^{14}}{7!} + ...`)}

        <p>
          Plugging into our Fresnel integral, we get:
        </p>

        {latexblock(`S(x) = \\int_{0}^{x} \\sum_{n=0}^{\\infty} \\frac{(-1)^{n} \\hspace{0.1cm} t^{4n+2}}{(2n+1)!} dt`)}

        <p>
         For <a href='https://en.wikipedia.org/wiki/Dominated_convergence_theorem' target='_blank' rel='noreferrer'>reasons</a> that are outside the 
         scope of this lesson, we can switch the order of the sum and the integral:
        </p>

        {latexblock(`S(x) = \\sum_{n=0}^{\\infty} \\int_{0}^{x} \\frac{(-1)^{n} \\hspace{0.1cm} t^{4n+2}}{(2n+1)!} dt`)}

        <p>
         The {mathy('n')}-terms are constant with respect to {mathy('t')}, so we can pull them out of the integral:
        </p>

        {latexblock(`S(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n}}{(2n+1)!} \\int_{0}^{x} t^{4n+2} dt`)}

        <p>
         Then evaluate the definite integral by our usual methods:
        </p>

        {latexblock(`\\int_{0}^{x} t^{4n+2} dt = \\frac{t^{4n+3}}{4n+3} \\bigg\\vert_{0}^{x} = \\frac{x^{4n+3}}{4n+3}`)}

        <p>
         And putting it all together:
        </p>

        {latexblock(`S(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n} \\hspace{0.1cm} x^{4n+3}}{(2n+1)! \\hspace{0.1cm} (4n+3)} = \\frac{x^3}{3} - \\frac{x^7}{42} + \\frac{x^{11}}{1320} - \\frac{x^{15}}{75600} + ...`)}

        <p>
         We now have an infinite polynomial that exactly equals {mathy('S(x)')} for all inputs! We can truncate this polynomial at any point to calculate
         approximate values. Remember, however, that this polynomial is centered at {mathy('0')}, so if we want to approximate values far away 
         from {mathy('0')} we will need many terms. 
        </p>

        <p>
         Let's calculate {mathy('S(1)')}, using the first 2 terms:
        </p>

        {latexblock(`S(1) \\approx \\frac{(1)^3}{3} - \\frac{(1)^7}{42} = 0.3095`)}

        <p>
         The actual value is {mathy('0.3013')}. Not bad! We can visualize how the accuracy of our approximation increases as we add more terms:
        </p>
        
      </div>

      <div className="math">
        <FresnelApproximation />
      </div>

      <h1>
          Euler Spiral
      </h1>

      <div className="lesson">

        <p>
          You may still be wondering about how to draw that spiral from the beginning of the lesson. 
          Well, the Fresnel Integral we have been working with is only half of the picture.
          It turns out there are actually two separate (but related) Fresnel Integrals, defined as:
        </p>

        {latexblock(fresnelIntegral)}
        {latexblock(`C(x) = \\int_{0}^{x} \\cos\\left(t^2\\right) \\, dt`)}

        <p>
          We focused on {mathy('S(x)')} this lesson, but the same principles apply to approximating {mathy('C(x)')}. There are many ways we can 
          visualize these two functions to explore their relationship. For one, we could simply graph them on the same plane:
        </p>
      </div>

      <div className="math">
          <TwoGraphs
            funcs={[fresnelx, fresnely]}
            xrange={Math.PI * 1.5}
            maxV={2.5}
            minV={-2.5}
            labels={false}
            pan={false}
            zoom={false}
          />
      </div>

      <div className="lesson">
        <p>
          But a more interesting method is to define a parameter {mathy('p')} and create a unified <a href="https://en.wikipedia.org/wiki/Parametric_equation" target="_blank" rel="noreferrer">parametric function</a> that 
          uses {mathy('S(p)')} as its {mathy('x')}-value and {mathy('C(p)')} as its {mathy('y')}-value. If this is unfamiliar, I encourage you to check out <a href="https://tutorial.math.lamar.edu/classes/calcii/parametriceqn.aspx" target="_blank" rel="noreferrer">this great resource</a>.
          Our parametric function looks like this:
        </p>

        {latexblock(`\\left(x(p), y(p)\\right) = \\left(\\int_{0}^{p} \\sin\\left(t^2\\right) \\, dt, \\int_{0}^{p} \\cos\\left(t^2\\right) \\, dt \\right)`)}

        <p>
          Now we can let {mathy('p')} range from between whatever endpoints we choose, and this will draw our spiral:
        </p>
      </div>
      <div className="math">
          <ParametricPlotSlider
            xfunc={fresnelx}
            yfunc={fresnely}
            xrange={1}
            maxV={1}
            minV={-1}
          />
      </div>

      <div className="lesson">
        <p>
          And we're done! This is a vast and complex topic, worthy of an entire textbook, so don't worry if some of the details
          are still unclear. Hopefully you came out of this with a better understanding of the Taylor Series, and how it can help us solve 
          otherwise unsolvable problems. Thank you for reading!
        </p>
      </div>

  </div>;
}

export default ProjectDisplay;

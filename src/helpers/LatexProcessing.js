export function processLatex(input) {
  function convertLatexFractionsToJS(input) {
    function processFractions(match, numerator, denominator) {
      const processedNumerator = processFractionsInside(numerator);
      const processedDenominator = processFractionsInside(denominator);
      return `(${processedNumerator})/(${processedDenominator})`;
    }

    function processFractionsInside(expression) {
      return expression.replace(/\\frac{([^}*])}{([^}*])}/g, processFractions);
    }

    // Replace LaTeX fractions in the input string
    const result = input.replace(/\\frac{([^}*])}{([^}*])}/g, processFractions);

    return result;
  }

  function replaceLogNotationWithNesting(input) {
    // Define a regular expression to match and replace nested logarithmic expressions
    const result = input.replace(/\\log_([^{^}^(^)]+)\(([^{}]+)\)/g, (match, base, expression) => {
      // Process nested expressions using recursion
      const processedExpression = replaceLogNotationWithNesting(expression);
      return `log(${processedExpression}, ${base})`;
    });
  
    return result;
  }

  function replaceNaturalLog(input) {
    // Define a regular expression to match and replace nested logarithmic expressions
    const result = input.replace(/\ln\(([^{}]+)\)/g, (match, expression) => {
      // Process nested expressions using recursion
      const processedExpression = replaceNaturalLog(expression);
      return `log(${processedExpression}, e)`;
    });
  
    return result;
  }

  //console.log("initial: " + input);

  let result = convertLatexFractionsToJS(input);

  //console.log(result);

  result = result.replace(/\\left/g, "").replace(/\\right/g, "");

  //console.log(result);

  // Replace LaTeX '\cdot' with '*'
  result = result.replace(/\\cdot/g, " * ");

  //console.log(result);

  // Replace '\\' with '\'
  result = result.replace(/\\([a-zA-Z]+)\b/g, "$1");

  //console.log(result);

  // Replace '{' with '(' and '}' with ')'
  result = result.replace(/{/g, "(").replace(/}/g, ")");

  //console.log(result);

  result = result.replace(/mathrm/g, "")

  result = result.replace(/arc/g, "a")

  // Match common math functions followed by a space and variable
  const functionRegex = /(sin|cos|tan|log|abs|asin|acos|atan|csc|cot|sec|acsc|acot|asec)\s+([a-zA-Z0-9]+)/g;

  //console.log(result);

  // Replace functions with parentheses
  result = result.replace(functionRegex, '$1($2)');

  //console.log(result);

  result = replaceLogNotationWithNesting(result);
  result = replaceNaturalLog(result);

  //console.log("final: " + result);

  return result;
}

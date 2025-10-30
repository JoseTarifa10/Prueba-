import { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [lastWasOperator, setLastWasOperator] = useState(false);
  

  const calculate = (expression: string): string => {
    const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
    const tokens = sanitized.match(/([0-9.]+|[+\-*/])/g);
    
    if (!tokens) return '0';

    let result = parseFloat(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);

      if (isNaN(operand)) break;

      switch (operator) { 
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '*':
          result *= operand;
          break;
        case '/':
          if (operand === 0) return 'Error';
          result /= operand;
          break;
      }
    }

    return result.toString();
  };

  const handleNumber = (number: string) => {
    if (hasResult) {
      setDisplay(number);
      setEquation(number);
      setHasResult(false);
    } else {
      if (number === '.' && display.includes('.')) {
        return; // Prevent multiple decimal points
      }
      if (display === '0' && number !== '.') {
        setDisplay(number);
        setEquation(equation === '0' ? number : equation + number);
      } else {
        setDisplay(display + number);
        setEquation(equation + number);
      }
    }
    setLastWasOperator(false);
  };

  const handleOperator = (operator: string) => {
    if (lastWasOperator) {
      // Replace the last operator
      setEquation(equation.slice(0, -3) + ' ' + operator + ' ');
      return;
    }
    setHasResult(false);
    setDisplay('0');
    setEquation(equation + ' ' + operator + ' ');
    setLastWasOperator(true);
  };

  const handleEquals = () => {
    if (lastWasOperator) {
      setEquation(equation.slice(0, -3));
      return;
    }
    try {
      const result = calculate(equation);
      setDisplay(result);
      setEquation(result);
      setHasResult(true);
      setLastWasOperator(false);
    } catch {
      setDisplay('Error');
      setEquation('');
      setHasResult(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation || '0'}</div>
        <div className="current">{display}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="btn clear">C</button>
        <button onClick={() => handleOperator('/')} className="btn operator">÷</button>
        <button onClick={() => handleNumber('7')} className="btn">7</button>
        <button onClick={() => handleNumber('8')} className="btn">8</button>
        <button onClick={() => handleNumber('9')} className="btn">9</button>
        <button onClick={() => handleOperator('*')} className="btn operator">×</button>
        <button onClick={() => handleNumber('4')} className="btn">4</button>
        <button onClick={() => handleNumber('5')} className="btn">5</button>
        <button onClick={() => handleNumber('6')} className="btn">6</button>
        <button onClick={() => handleOperator('-')} className="btn operator">−</button>
        <button onClick={() => handleNumber('1')} className="btn">1</button>
        <button onClick={() => handleNumber('2')} className="btn">2</button>
        <button onClick={() => handleNumber('3')} className="btn">3</button>
        <button onClick={() => handleOperator('+')} className="btn operator">+</button>
        <button onClick={() => handleNumber('0')} className="btn zero">0</button>
        <button onClick={() => handleNumber('.')} className="btn">.</button>
        <button onClick={handleEquals} className="btn operator equals">=</button>
      </div>
    </div>
  );
};

export default Calculator;
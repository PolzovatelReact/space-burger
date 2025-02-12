import React, { useState, useEffect } from "react";

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operator, setOperator] = useState("+"); // Изначальный оператор + в select
  const [result, setResult] = useState<number | string>(0);

  useEffect(() => {
    //let calcResult: number | string = 0;
    let calcResult: string | number;
    switch (operator) {
      case "+":
        calcResult = num1 + num2;
        break;
      case "-":
        calcResult = num1 - num2;
        break;
      case "*":
        calcResult = num1 * num2;
        break;
      case "/":
        calcResult = num1 / num2;
        break;
      default:
        calcResult = "Ошибка";
    }

    setResult(calcResult);
  }, [num1, num2, operator]);
  return (
    <div>
      <h1> Калькулятор</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(parseFloat(e.target.value))}
      />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(parseFloat(e.target.value))}
      />
      <h3>{result}</h3>
    </div>
  );
};
export default Calculator;

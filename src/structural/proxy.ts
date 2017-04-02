module Proxy {
  interface ICalculator {
    value: number;
    add(value: number): number;
    subtract(value: number): number;
    multiply(value: number): number;
    reset(): void;
  }

  class Calculator implements ICalculator {
    private _value: number = 0;
    public get value(): number {
      return this._value;
    }

    public add(value: number): number {
      return this._value += value;
    }

    public subtract(value: number): number {
      return this._value -= value;
    }
    public multiply(value: number): number {
      return this._value *= value;
    }

    public reset(): void {
      this._value = 0;
    }
  }

  /*Adds logging to the Calculator*/
  class CalculatorProxy implements ICalculator {
    private _calculator: Calculator = new Calculator();

    public get value(): number {
      return this._calculator.value;
    }

    public add(value: number): number {
      console.log("Start adding " + value + ".");
      var result = this._calculator.add(value);
      console.log("Finished adding " + value + ".");
      this.logValue();
      return result;
    }

    public subtract(value: number): number {
      console.log("Start subtracting " + value + ".");
      var result = this._calculator.subtract(value);
      console.log("Finished subtracting " + value + ".");
      this.logValue();
      return result;
    }

    public multiply(value: number): number {
      console.log("Start multiplying by " + value + ".");
      var result = this._calculator.multiply(value);
      console.log("Finished multiplying by " + value + ".");
      this.logValue();
      return result;
    }

    public reset(): void {
      console.log("Start resetting");
      this._calculator.reset();
      console.log("Finished resetting");
      this.logValue();
    }

    private logValue(): void {
      console.log("The value of the calculator now is: " + this._calculator.value);
    }
  }

  window.addEventListener("load", function () {
    var calculator: ICalculator = new CalculatorProxy();
    calculator.add(3);
    calculator.subtract(1);
    calculator.multiply(4);
    console.log("The value of the calculator is: " + calculator.value);
  });
}
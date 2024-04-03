import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  display = '';
  history = '';
  firstOperand: number | null = null;
  operator = '';
  isValidOperation = true;
  hasError = false;

  constructor() {}

  ngOnInit() {}

  handleInput(input: string) {
    if (!this.isValidOperation && !['+', '-', '*', '/'].includes(input)) {
      return;
    }
    if (input === 'C') {
      this.reset();
    } else if (['+', '-', '*', '/'].includes(input)) {
      this.handleOperator(input);
    } else if (input === '=') {
      this.calculateResult();
      this.isValidOperation = true;
    } else {
      this.display += input;
      this.history += input;
    }
  }

  handleOperator(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.display);
    } else {
      this.calculateResult();
      this.display = this.firstOperand.toString();
      this.history = this.firstOperand.toString();
    }
    this.operator = op;
    this.display += op;
    this.history += op;
  }

  calculateResult() {
    if (this.firstOperand === null || this.operator === '') {
      return;
    }

    const expression = this.history.split(this.operator);
    if (expression.length !== 2) {
      this.reset();
      this.display = 'Invalid Expression';
      return;
    }

    const [num1, num2] = expression.map(Number);
    let result: number | undefined;

    switch (this.operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num1 / num2; break;
    }

    if (result === undefined || !isFinite(result)) {
      this.reset();
      this.display = 'Invalid Expression';
      return;
    }

    this.display = result.toString();
    this.firstOperand = result;
    this.operator = '';
    this.isValidOperation = true;
  }

  reset() {
    this.display = '';
    this.history = '';
    this.firstOperand = null;
    this.operator = '';
    this.isValidOperation = true;
    this.hasError = false;
  }
}
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import {CalculatorButton} from './CalculatorButton';

interface CalculatorState {
  inputText: string;
}

interface ReducerState {
  currentValue: string;
  previousValue?: string;
  binaryOperation?: (x: number, y: number) => number;
}

function reducer(acc: ReducerState, value: string) {
  if (value === 'C') {
    return {
      ...acc,
      currentValue: ''
    };
  }

  if (value === '+') {
    return {
      previousValue: acc.currentValue,
      currentValue: '',
      binaryOperation: (a: number, b: number) => (a + b)
    };
  }

  if (value === '=') {
    return {
      currentValue: String(acc.binaryOperation!(Number(acc.previousValue), Number(acc.currentValue))),
    };
  }

  return {
    ...acc,
    currentValue: acc.currentValue + value
  };
}

export class Calculator extends React.Component<{}, CalculatorState> {
  click$: Rx.Subject<string>;

  constructor() {
    super();
    this.state = {inputText: 'MyText'};

    this.click$ = new Rx.Subject<string>();

    this.click$.scan(reducer, {currentValue: ''} as ReducerState).subscribe(s => {
      this.setState({inputText: s.currentValue});
    });
  }

  render() {
    return (
        <div>
          <div>
            <input type="text" value={this.state.inputText}/>
          </div>
          <div>
            <CalculatorButton text="+" click$={this.click$}/>
            <CalculatorButton text="7" click$={this.click$}/>
            <CalculatorButton text="8" click$={this.click$}/>
            <CalculatorButton text="9" click$={this.click$}/>
          </div>
          <div>
            <CalculatorButton text="-" click$={this.click$}/>
            <CalculatorButton text="4" click$={this.click$}/>
            <CalculatorButton text="5" click$={this.click$}/>
            <CalculatorButton text="6" click$={this.click$}/>
          </div>
          <div>
            <CalculatorButton text="x" click$={this.click$}/>
            <CalculatorButton text="1" click$={this.click$}/>
            <CalculatorButton text="2" click$={this.click$}/>
            <CalculatorButton text="3" click$={this.click$}/>
          </div>
          <div>
            <CalculatorButton text="/" click$={this.click$}/>
            <CalculatorButton text="C" click$={this.click$}/>
            <CalculatorButton text="0" click$={this.click$}/>
            <CalculatorButton text="=" click$={this.click$}/>
          </div>
        </div>
    );
  }
}

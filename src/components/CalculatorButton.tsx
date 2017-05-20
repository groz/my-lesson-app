import * as React from 'react';
import * as Rx from 'rxjs/Rx';

interface CalculatorButtonProps {
  text: string;
  click$: Rx.Subject<string>;
}

export const CalculatorButton = ({text, click$}: CalculatorButtonProps) => (
  <input type="button" value={text} onClick={e => click$.next(text)}/>
);

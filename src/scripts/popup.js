import run from '@cycle/rxjs-run';
import { makeDOMDriver, div } from '@cycle/dom';
import { Observable as Ob } from 'rxjs';

const main = (sources) => {
  const { DOM } = sources;
  const tickStream$ = Ob.interval(2000);
  return { DOM: tickStream$.map(s => div('hello' + s)).startWith(div('hello, world!')) };
}

const dispose = run(main, {
  DOM: makeDOMDriver('#app')
});

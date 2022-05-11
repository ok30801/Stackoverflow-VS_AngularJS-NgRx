import {
  trigger,
  transition,
  style,
  query,
  group,
  animate, animateChild
} from '@angular/animations';

export const slider = trigger('routeAnimation', [
  transition('1 => 2, 1 => 3, 2 => 3', [
    style({ height: '!' }),
    query(':enter', style({ transform: 'translateX(100%)' })),
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: '30px', right: '30px' })),
    group([
      query(':leave', [
        animate('0.5s cubic-bezier(.42, 0, .58, 1)', style({ transform: 'translateX(-100%)', opacity: '0' })),
      ]),
      query(':enter',
        animate('0.5s cubic-bezier(.42, 0, .58, 1)',
          style(
            { transform: 'translateX(0)'}
          ))),
    ]),
  ]),
  transition('3 => 2, 2 => 1, 3 => 1', [
    style({ height: '!' }),
    query(':enter', style({ transform: 'translateX(-100%)' })),
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: '30px', right: '30px' })),
    group([
      query(':leave', [
        animate('0.5s cubic-bezier(.42, 0, .58, 1)', style({ transform: 'translateX(100%)', opacity: '0' })),
      ]),
      query(':enter',
        animate('0.5s cubic-bezier(.42, 0, .58, 1)',
          style(
            { transform: 'translateX(0)'}
          ))),
    ]),
  ]),
])




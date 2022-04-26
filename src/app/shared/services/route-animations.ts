import {
  trigger,
  transition,
  style,
  query,
  group,
  animate, animateChild
} from '@angular/animations';

export const slider = trigger('routeAnimation', [
  transition('* <=> *', [
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
])

export const myAnimation = trigger("routeAnimation", [
  transition("* <=> *", [
    query(':enter, :leave', style({ position: 'absolute', top: 0, left: '30px', right: '30px' })),
    query(":enter", [style({ opacity: 0 })], { optional: true }),

    query(
      ":leave",
      [style({ opacity: 1 }), animate("0.2s", style({ opacity: 0 }))],
      { optional: true }
    ),

    query(
      ":enter",
      [style({ opacity: 0 }), animate("0.2s", style({ opacity: 1 }))],
      { optional: true }
    ),
  ]),
]);



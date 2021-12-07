import { createSelector } from '@/selector';

const checkStringHaveOnlyHAndILetters = (value: string) => (
  value.trim().split('').every((letter: string) => letter === 'H' || letter === 'I')
);

const selector = createSelector<string, string | number>()
  .when(value => value.length === 3).do(value => { console.log(value); return 1; })
  .when(checkStringHaveOnlyHAndILetters).do(value => { console.log('HELLO!', value); return 2; })
  .when(value => value.includes('bye')).do(value => { console.log('BB', value); return 3; })
  .when.isEqual('3').do(value => Number(value) * 2)
  .fallback((value: string) => { console.log('FALLBACK', value); return 4; });

console.log(selector('QWE'));       // "QWE"              // 1
console.log(selector('1'));         // "FALLBACK",  "1"   // 4
console.log(selector('HI'));        // "HELLO!",  "HI"    // 2
console.log(selector('2'));         // "FALLBACK",  "2"   // 4
console.log(selector('Good bye'));  // "BB",  "Good bye"  // 3
console.log(selector('3'));                               // 6

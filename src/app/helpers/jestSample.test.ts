import {fizzBuzz} from "./jestSample"

test('fizzBuzzのユニットテスト',()=>{
    expect(fizzBuzz(1)).toBe(1);
    expect(fizzBuzz(3)).toBe('Fizz');
    expect(fizzBuzz(5)).toBe('Buzz');
    expect(fizzBuzz(15)).toBe('FizzBuzz');
});

export {};
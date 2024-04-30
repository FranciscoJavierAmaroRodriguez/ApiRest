// import assert from 'node:assert';
// import test from 'node:test';
// import multi from './modulo.js';
const multi = require('./modulo');

test('Una multiplicacion de 2 por 4 da 8',()=>{
    expect(multi(2,4)).toBe(8);
})
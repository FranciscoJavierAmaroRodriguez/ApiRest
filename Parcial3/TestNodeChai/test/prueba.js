import test from 'node:test';
import multi from './modulo.js';
import * as chai from 'chai';

test('Una multiplicacion de 2 por 4 da 8', () => {
    console.log('Testing multi function...');
    const result = multi(2, 4);
    console.log('Result:', result);
    chai.assert.equal(result, 8);
});
import assert from 'node:assert';
import test from 'node:test';
import multi from './modulo.js';

test('Una multiplicacion de 2 por 4 da 8',()=>{
    assert.strictEqual(multi(2,4),8);
})
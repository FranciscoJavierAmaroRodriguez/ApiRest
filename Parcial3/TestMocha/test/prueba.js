// import test from 'node:test';
import * as modulo from '../src/modulo.js';
import {assert} from 'chai';

describe('Una multiplicacion de 2 por 4 da 8', () => {
    it('Multiplicar 2 y 4 resultado debe ser 8',()=>{
        assert.equal(modulo.multi(2,4),8);
    })
});

describe('Una resta de 4 menos 2 da 2', () => {
    it('Restar 4 y 2, resultado debe ser 2',()=>{
        assert.equal(modulo.resta(4,2),2);
    })
});

describe('Una suma de 2 más 4 da 6', () => {
    it('Sumar 2 y 4, resultado debe ser 6',()=>{
        assert.equal(modulo.suma(2,4),6);
    })
});
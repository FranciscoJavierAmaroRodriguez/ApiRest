const prueba = require("./modulo");
prueba.Random6 = jest.fn(()=> 6 )

test('Una multiplicacion de 2 por 4 da 8',()=>{
    let multi=prueba.multi(2,4);
    expect(multi).toBe(8);

    expect(prueba.Random6(1,6)).toBe(6);
})
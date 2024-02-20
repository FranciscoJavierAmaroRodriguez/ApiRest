const { promises } = require("dns")

function promesa1()
{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{resolve('ok 1')},2000)
    })
}
function promesa2()
{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{resolve('ok 2')},200)
    })
}
function promesa3()
{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{resolve('ok 3')},1500)
    })
}

Promise.race([promesa1(),promesa2(),promesa3()])
.then(result => console.log(result))
.catch(error => console.log(error))
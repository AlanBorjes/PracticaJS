// Ejercicio 1: Promesas Encadenadas
const randomNumber = () =>{
    let number1 =  new Promise((resolve, reject)=>{
        setTimeout(function(){
            let numeroRandom = Math.floor(Math.random() * 100);
            resolve(numeroRandom)
            console.log("El numero random es: "  + numeroRandom)
        },2000)
    });
    let number2 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            number1.then((response=>{
                let numeroAlCuadrado  = response**2;
                resolve(numeroAlCuadrado)
                console.log("El numero al cuadrado es: "  + numeroAlCuadrado)
            }))
        },3000)
    });
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            number2.then((response=>{
                let numeroRaiz = Math.sqrt(response);
                resolve(numeroRaiz)
                console.log("La raiz del cuadrado es: "  + numeroRaiz)
            }))
        },4000)
    });

}
randomNumber().then(console.log);

// Ejercicio 2: Promesa de Múltiples Solicitudes
const URLArray = ['https://pokeapi.co/api/v2/pokemon/bulbasaur','https://pokeapi.co/api/v2/pokemon/pikachu','https://pokeapi.co/api/v2/pokemon/charmander']
const multipleFetch = (array) =>{
    const arrayPromesas = [];
    array.forEach((e,i)=>{arrayPromesas.push(fetch(array[i])
        .then(res=>res.json())
        .then(res=>res.name)
        );});
    return arrayPromesas;   
}
Promise.all(multipleFetch(URLArray)).then((values)=>{
    console.log(values);
});


// Ejercicio 3: Promesas Paralelas
const Function1 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 1"))}
const Function2 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 2"))}
const Function3 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 3"))}
const arrayFunctions = [Function1,Function2,Function3];
const paralleloPromises = (arrrayFunciones)=>{
    return Promise.all(arrrayFunciones.map(e=>e()));
}

paralleloPromises(arrayFunctions).then(values=>console.log(values))

// Ejercicio 4: Promesas en Cadena con Retraso

 const chainingPromises = (n)=>{
     for(let i = 0; i<n; i++){
         new Promise((resolve,reject)=>{
            setTimeout( resolve(console.log(`resolucionDePromesa numero: ${i+1}`) ,n*1000)
                        )
         })
     }
 }

 chainingPromises()

// Ejercicio 5: Promesa con Cancelación
let cancelPromiseCalled;

const doPromise = ()=>{
    setTimeout(()=>{
        if(cancelPromiseCalled){
            cancelPromise().then(res=>console.log(res))
        }else{
            new Promise((resolve,reject)=>{
                resolve(console.log(`Resolved succesfull`));
            })
        }
    },5000);
}   

const cancelPromise = ()=>{
    cancelPromiseCalled = true;
    new Promise((resolve,reject)=>{
        reject(`Canceled promise`);
    })
}   

doPromise();cancelPromise();
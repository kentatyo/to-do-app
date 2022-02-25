
// const outPutFizzBuzz=()=>{
//     for(let i = 0; i<100;i++){
//         console.log(fizzBuzz(i));
//     }
// }

export const fizzBuzz = (i:number) => 
{
        if(i%15===0){
            return "FizzBuzz"
        }
        if(i%5===0){
            return "Buzz"
        }
        if(i%3===0){
            return "Fizz"
        }
        return i
}


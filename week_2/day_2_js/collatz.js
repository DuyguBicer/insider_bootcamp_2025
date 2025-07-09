function collatz(n) {

    let count = 1;

    while(n !== 1) {
        if( n % 2 === 0) {
            n = (n/2)
        } else {
            n = ((3*n) +1)
        }
   count ++;
 }
 
    return count;
}

let maxLength= 0;
let start = 0;

for(let i = 1; i < 1000000; i++) {

     let length = collatz(i);

    if (length > maxLength) {
        maxLength = length;
        start = i
    }
}
console.log(collatz(13));
console.log("En uzun zinciri başlatan sayı:", start);
console.log("Zincirin uzunluğu:", maxLength);

## Arrow Function
 const teacher ={
    name: "jimmy"
     speak: function(){
            let boundfunction = function(){
            console.log("later is my name is " + this.name);
       }
            .bind(this);
        

    //  bound function will always run in bound contet
         setTimeout(boundFunction, 1000)

     }
 };
 teacher.speak();
 _lexical binding _  they bind to cope where defined not where they are used.
 ...
## Map 

...
let students = [
 {name:'Hugo'},
 {name: 'candance'},
 {name:' Taylor'},
 {name:'Dimitry'},
 ];

let names = students.map({student} => {
     return student.name
 }
 console.log(names);


console.log(names);
...

 ## Rest 

 The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
 function add(){
      console.log("arguments objets:", arguments);
    var numbers = Array.prototype.slice.call(arguments);

     var sum = 0;

   numbers.forEach( function [number]{
        sum += number ;

    });
    return sum ;
 }
  console.log (add 1,2,3,4,5,6,7,8);


_Method 2_


let add = (..numbers) => {
         console.log ( "rest parameters", numbers);
     let sum = 0;
     numbers.forEach(function [numbers]{
        sum += number ;
    });
    return sum;

 }
 console.log(add [1,2,3,4,5,6,7,8])

 Rest is defined inside a function to pull and saves the values.






let add = (...numbers) => numbers.reduce([sum, numbers] => sum += numbers, 0);
 function addStuff(x,y,...z){
     return (x+y) * z. lengtth
}
 console.log(addStuff[1,2, "hello", "world",true,99]);


## spread operator

The spread operator allows us to split and Array argument into individual elemen

It is mostly uded in variable array where there is more than one value is expected.

...

 let random  =[ "hello", "world",true,99]
let newArray = [1,2,"hello","world",true,  99]


 console.log(addStuff[1,2,... random, 3]
    console.log(newArray);



     let spreadEx = (item) => {
        let spreadArray = [...item]
        console.log(spreadArray);
         return spreadArray
     }
    spreadEx("Hello world")

     let restEx = (...Z =>{

         console.log(z)
         return (z)
     restEx("hello", "world")

     ...

   ## Destruction 



      var students = ["Jullian", "AJ" , "Mac"]


     var  x = students = students[0];     var  y = students = students{1};
     var  z = students[2];
     console.log(x, y, z);
      let students = ["Julian", "AJ", "Matt"]
     let[x, y, z] = students
      let [x, ,z] = students;
      let [x, ...rest] = students;
    console.log(x, rest)
      julian[Aj,Mat
    
    
    let completedHomework = () => { 
        return ["julian", "AJ", "Matt"];

    }

    let[x,y,z] = completedHome()

   console.log(x,y,z);
   //Also works with objects//
    let instructor = {
       name : "Jimmy",
      email: "abc@gmail.c
    }


 let { name x, email y}= instructor;
console.log(x);


  let car = {
    make: "Honda"
 }

  function something(make, year = 2001){
     console.log (make, year)
  } 
  something(car);


function Person (name, job) {
    this.job = job;
/ }

 person.prototype.getName = function getName() {
    return this.name:
 }
 var goodGuy = new Person ("Anag", "Airbender"):
  console.log(goodGuy.getName[])

## Constructor

 class Person {
     constructor (name, job)
     this.name = name;
    this.job = job;

 }
 getName(){
     return this.name;
 }
 getJob() {
     return this.job
 }
}
 let goodGuy = new Person ('Neo', 'the one')
 console.log(goodGuy);


 class Person {
    constructor (name, job){
        this.name = name;
      ){
    return this.name;
}
 getJob(){
    return this.job:

}  this.job = job;
    }
 }
 getName(

 class SuperHero extends Person {
    constructor (name, heroName, superPo
\    super(name):
    this.heroName = heroName;
    this.superPower = superPower;

}
 secretIdentity(){
    return`${this.heroName} is ${this.name}!`
 }
 }
  let batMan = new SuperHero("Bruce Wayne", " I am Batman")
 console.log (batman.secretIdentity[])


class Person {
    constructor (names
        this.name = name;
    }
    set name(name){
        this.name = name;

    }
    get name(){
        return this.name
    }
 }

 let googdGuy = new Person ('Jim Gordon');
 console.log(goodGuy.name);

 goodGuy.name "James Gordon";
 console.log(goodGuy.name);
  

let student = { name: "A-aron"};
let status = new Map();
status.set("D-nice");

status.set("feeling", "churlish");
console.log(status.get[name]);
console.log(status.get["feeling"])

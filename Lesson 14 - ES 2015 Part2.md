# ES2015 Part 2 - Rest and Spread, Destructuring, Class Sytnax, and Modules

## Recap & Intro
- Last class we covered several of the new features in es2015
- Tonight we'll continue exploring: 
    - Rest and Spread
    - Destructuring
    - Class Syntax (NO! classes still do not exist in JS)
    - ES6 Modules
    - Sets and Maps



## Rest & Spread

### Rest

The **rest parameter** lets you pass an indefinite number of arguments as an array.

Rest parameters are invoked using the `...` syntax

This is similar to the **arguments** object that we learned about way back in class #3. However, **rest paramaters** offer significant advantages. 

##### the old fashioned way 
```javascript
function add() {
	console.log("arguments object:", arguments);
	
	var numbers = Array.prototype.slice.call(arguments),
	
	var sum = 0;
	
	numbers.forEach(function (number) {
	   sum += number;
	});
	return sum;
}

console.log(add(1,2,3,4,5,6,7,8));
// arguments object: {"0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8}
// 36
```

In the above example, we had to convert the **arguments** object into an array, because it's not an *actual array*

**Rest parameters** on the other hand, provides an actual array <br> *meaning methods like `sort`, `map`, `forEach` and `pop` can be applied on it directly*. 

##### the ES2015 way
```javascript
let add = (...numbers) => {
  console.log("rest parameters:", numbers);

  let sum = 0;

  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
}

 console.log(add(1,2,3,4,5,6,7,8));
// rest parameters: [1,2,3,4,5,6,7,8]
// 36
```

As you can see, this new syntax is much more readable. <br> You can immediately tell this function can take any number of arguments. 

Just for fun, lets use `reduce` to make our `add` function a one-line statement

```javascript
let add = (...numbers) => numbers.reduce((sum, number) => sum += number, 0)

console.log(add(1,2,3,4,5,6,7,8));
// 36
```

It's also possible to combine `rest` parameters with multiple arguments
##### Another rest params example
```javascript
function addStuff(x, y, ...z) {
    return (x + y) * z.length
}

console.log(addStuff(1, 2, "hello", "world", true, 99));
// 12
```
*note: rest paramaters must be your last argument in the function signature*

### Spread 

The **spread operator** allows us to *split* and Array argument into individual elements.

```javascript
let random = ["Hello", "world", true, 99];
let newArray = [1,2, ...random, 3];

console.log(newArray);
//[1,2,"Hello","world",true,99,3]
```

Another example, *spreading* out the characters in the `hi` variable

```javascript
let hi = "Hello World"
let hiArray = [ ...hi ]

console.log(hiArray);
// ["H","e","l","l","o"," ","W","o","r","l","d"]
```

### Rest vs Spread

Though the syntax is virtually the same, **rest** and **spread** serve different purposes... 

- **rest** 
	- gathers values and stores them in an array
	- is used in function signatures (as an argument)
- **spread** 
	- spreads the values into individual array items
	- used in the function body 


##### Rest Example
```javascript
let restExample = (...z) => {
    console.log(z)
    return z
}

restExample("hello", "world")
//["hello", "world"]
```

##### Spread Example

```javascript
let spreadExample = (item) => {
    let spreadArray = [...item]
    console.log(spreadArray);
    return spreadArray
}

spreadExample("Hello World");
// ["h","e","l","l","o"," ","w","o","r","l","d"]
```

## Exercise

- complete exercises (18)[http://tddbin.com/?229#?kata=es6/language/rest/as-parameter] - 21 (skipping #19) on Rest and Spread operators at [ES6Katas](http://es6katas.org/)

## Destructuring

### Arrays

With **destructuring** you can store array items as individual variables during assignment.

Consider the following examples:
##### *the old-fashioned way*
```javascript
var students = ["Julian", "AJ", "Matt"];
var x = students[0];
var y = students[1];
var z = students[2];

console.log(x, y, z);
// Julian AJ Matt
```
##### *the ES2015 way*

```javascript
let students = ["Julian", "AJ", "Matt"];
let[x,y,z] = students

console.log(x,y,z);
// Julian AJ Matt
```

As you can see, this incredibly useful and readable. It also allows for scalability of your code. 

**Destructuring** also allows you to omit values 

```javascript
let students = ["Julian", "AJ", "Matt"];
let[ ,y,z] = students

console.log(y,z);
// AJ Matt
```
```javascript
let students = ["Julian", "AJ", "Matt"];
let[x,,y] = students

console.log(x,y);
// Julian Matt
```
### Using destructuring with rest parameters
<!-- possibly turn this into a challenge -->

Now that you know how to use destructuring with and rest parameters, how would you implement both concepts

```javascript
let students = ["Julian", "AJ", "Matt"];
let[x, ...rest] = students;

console.log(x, rest);
// Julian ["AJ","Matt"]
```

### Array destructuring with functions
How would this work with functions? 

```javascript
let completedHomework = () => {
  return ["Julian", "AJ", "Matt"];
}

let [x,y,z] = completedHomework();
console.log(x,y,z);
```

### Objects

**Destructuring** also works with objects


```javascript
let instructor = {
  name: "Shane",
  email: "shane@techtalentsouth.com"
}
let { name: x , email: y } = instructor;

console.log(x);
// Shane
```

### Bringing it all together

Let's use destructuring and default parameters in a function:

```javascript
let instructor = {
  name: "Shane",
}

function teacher({name, email = "info@techtalentsouth.com"}) {
  console.log(name, email)
}

teacher(instructor);
// Shane info@techtalentsouth.com
```

## Exercise

- complete challenges 10-15 (Destructuring) at [ES6Katas](http://tddbin.com/?183#?kata=es6/language/destructuring/array)

## Classes

One of the most interesting/exciting features of ES2015 is the introduction of Object Oriented Keywords. 
The benefit of this feature, is that developers more accustomed to Object Oriented Programming can more easily work with Constructors and Prototypes.

*note: the class features simply syntactic sugar, not an actual change to the functional nature of JavaScript*

##### *the old-fashioned way*
```javascript
function Person (name, job) {
  this.name = name;
  this.job = job;
};
 
Person.prototype.getName = function getName () {
  return this.name;
};
 
Person.prototype.getJob = function getJob () {
  return this.job;
};
var goodGuy = new Person('Jim Gordon', 'Commissioner');
console.log(goodGuy.getName());
// Jim Gordon
```

##### *the ES2015 way*
```javascript
class Person {
 
  constructor (name, job) {
    this.name = name;
    this.job = job;
  }
 
  getName () {
    return this.name;
  }
 
  getJob () {
    return this.job;
  }
}

let goodGuy = new Person('Jim Gordon', 'Commissioner');
console.log(goodGuy);
//Jim Gordon
```

For those of you that have experience in Ruby or Python, this syntax should look and feel familiar. 

- Use the `class` keyword followed by a capitalized name
- add a constructor function 
- add instance methods that give you access to the object's properties

### Inheritance
  
This syntatic sugar also provides a really nice and clean way to create inheritance chains 

*note remember that JS inhertance is still instance based (not class based)*

##### the old-fashioned way
```javascript
function Person (name, job) {
  this.name = name;
  this.job = job;
};
 
Person.prototype.getName = function getName () {
  return this.name;
};
 
Person.prototype.getJob = function getJob () {
  return this.job;
};

function SuperHero (name, heroName) {
  Person.call(this, name, heroName);
}

SuperHero.prototype = Object.create(Person.prototype);
SuperHero.prototype.constructor = SuperHero;

SuperHero.parent = Person.prototype;
SuperHero.prototype.getJob = function () {
  return 'I am '+ this.job + "!"
};

var batman = new SuperHero('Bruce Wayne', 'Batman');

console.log(batman.getJob()); 
```

As you can see, this is pretty verbose. Let's take a look at the ES2015 way 

##### *the ES2015 way*
```javascript
class Person {
 
  constructor (name, job) {
    this.name = name;
    this.job = job;
  }
 
  getName () {
    return this.name;
  }
 
  getJob () {
    return this.job;
  }
}

class SuperHero extends Person {
 
  constructor (name, heroName, superPower) {
    super(name);
    this.heroName = heroName;
    this.superPower = superPower;
  }
  
  secretIdentity(){
    return `${this.heroName} is ${this.name}!!!`
  }
 
}
let batman = new SuperHero("Bruce Wayne", "Batman");

console.log(batman.secretIdentity())
// Batman is Bruce Wayne!!!
```

The 3 things that you'll notice:

- create a new SuperHero `class`
- use the `extends` keyword to indicate you want to inherit from the Person `class`<br> *after all, superhero's are People too*
-  the use of `super()` allows us to:
	-  reuse the exisiting `name` functionality from the Person `class`
	-  add superhero specific features to our constructor function

### Getters and Setters

If you have experience with Object Oriented programming, chances are you're familiar with *getters* and *setters*

Getters allow us to easily **read** (access) an object's property.<br> 
Setters allow us to **write** (modify) an object's property.


```javascript
class Person {
 
  constructor (name) {
    this.name = name;
  } 
 
  set name (name) {
    this._name = name;
  }
 
  get name () {
    return this._name
  }
 
}

let goodGuy = new Person('Jim Gordon');
console.log(goodGuy.name);
// Jim Gordon

goodGuy.name = "James Gordon";
console.log(goodGuy.name);
// James Gordon
```

### Other nifty features

- ES2015 gives us a new way to easily add existing variables to objects. 

```javascript
let name = "Shane";
let job = "Developer";
    
let instructor = { name, job };

console.log(instructor);
// {"name":"Shane","job":"Developer"}
```
## Exercise

Complete Exercises [#22](http://tddbin.com/#?kata=es6/language/class/creation)-28 at [ES6 Katas](http://es6katas.org/)


## Modules

As you know, we've already talked about Modules quite a bit.<br>
ES2015 offers a module syntax that encapsulates our code. 

This provides several significant benefits including:

- avoids naming conflicts
- removes global variables
- better control over scope
- better control over 3rd party libraries
- logical load order
- faster tests

To many, this is the most exciting feature of ES2015

Modules consist of **export** and **import** statements

According to Mozilla:

Export:

> ...is used to export functions, objects or primitives from a given file (or module).

Import:

> ...is used to import functions, objects or primitives that have been exported from an external module, another script, etc.


let's take a look some basic examples:


##### exporting a single function
```javascript
// ./src/calculator.js

export function add(...numbers) {	
  let sum = 0;
  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
}
```

```javascript
// .src/index.js

import {add} from './calculator';

console.log(add(1,2,3));
```


##### exporting multiple items
```javascript
// ./src/calculator.js

export function add(...numbers) {
  let sum = 0;
  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
};

export function subtract(x,y) {
  return x - y;
};
```

```javascript
// .src/index.js

import {add, subtract} from './calculator';

console.log(add(1,2,3));
console.log(subtract(6,2));
```

**Variables and Constants can also be exported**

```javascript
// ./src/calculator.js

export const numbersArray = [1,2,3,4,5];
```

```javascript
// ./src/index.js

import _ from 'lodash';

console.log(_.shuffle(numbersArray));
```

**Default Exporting** allows you to set one item as default. This is helpful with a module or class that returns a single value

```javascript
// ./src/calculator.js

export default function add(...numbers) {
  let sum = 0;
  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
};
```

```javascript
// ./src/index.js

import add from './calculator';

console.log(add(1,2,3));
```

Only one default can be clarified per module. <br>
Modules can, however, have default and named exports

```javascript
// ./src/calculator.js

export default function add(...numbers) {
  let sum = 0;
  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
};

export function subtract(x,y) {
  return x - y;
};

```

```javascript
// ./src/index.js

import add, {subtract} from './calculator';

console.log(add(1,2,3));
console.log(subtract(6,2));
```

One final way to import is by using the `*` (all, wildcard) operator. This syntax will import all exports. 

```javascript
// ./src/calculator.js

export function add(...numbers) {
  let sum = 0;
  numbers.forEach(function (number) {
    sum += number;
  });
  return sum;
};

export function subtract(x,y) {
  return x - y;
};
```

```javascript
// ./src/index.js

import * as calculate from './calculator';

console.log(calculate.add(1,2,3));
console.log(calculate.subtract(6,2));
```

As you can see, writing modular code is the future of JavaScript. The modular pattern will be heavily used as we move into building applications with React. 

## Exercise 

Complete Exercise [#61](http://tddbin.com/#?kata=es6/language/modules/import) at [ES6 Katas](http://es6katas.org/)

## Map, Set, WeakMap, WeakSet

**Map** is a new way to store **key/value** pairs, while similar to objects **Map** is a bit more reliable when storing key/values. *This is due to the fact that Objects convert both keys and values to strings.*

According to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 
> The Map object is a simple key/value map. Any value (both objects and primitive values) may be used as either a key or a value.

```javascript
let student = {name: "Latori"};
let status = new Map();

status.set(name, "Latori");
status.set("feeling", "awesome")
console.log(status.get(name));
console.log(status.get("feeling"))
//Latori
//awesome
```
- to set a value use `set`
- to get an object use `get`

**Set** is a collection of unique values

```javascript
let student = new Set();
student.add('Katy').add({mood: "happy"});

console.log(student);
// ["Katy",{"mood":"happy"}]
```

**WeakMap** works like **Map**, with a few small differences.

- The keys must be objects
- Allows for garbage collection of keys
- does not allow iteration

```javascript
let weakMap = new WeakMap();
let student = {}
weakMap.set(student,"Lee");

console.log(weakMap.get(student));
// Lee
```

**WeakSet**

Like WeakMap for Sets

```javascript
let weakSet = new WeakSet();
let student = {
  name: "Heather"
};
weakSet.add(student);

console.log(student);
// {"name":"Heather"}
```


## Homework 

- complete the remainder of the [Count to 6](https://github.com/domenic/count-to-6) NodeSchool Module
- complete the [tower-of-babel](https://github.com/yosuke-furukawa/tower-of-babel) NodeSchool Module
    - upload screenshots to slack
- complete challenges 10-15, 22-28, and 61 at [ES6 Katas](http://es6katas.org/)
    - upload completed screenshots to slack

- complete [this](http://ccoenraets.github.io/es6-tutorial/) ES2015 tutorial
    - push the code to our class GitHub using the naming convention `es6_tutorial_YOUR_INITIALS_HERE`
- watch these 2 videos:<br><center>[![Factory Functions](http://img.youtube.com/vi/ImwrezYhw4w/0.jpg)](https://www.youtube.com/watch?v=ImwrezYhw4w) [![Composition over Inheritance](http://img.youtube.com/vi/wfMtDGfHWpA/0.jpg)](https://www.youtube.com/watch?v=wfMtDGfHWpA)</center>

- - - - 

## Reading
[ES6 Overview](https://ponyfoo.com/articles/es6)<br>
[Arrow Functions](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)<br>
[Map, Set, WeakMap, WeakSet](http://www.2ality.com/2015/01/es6-maps-sets.html)

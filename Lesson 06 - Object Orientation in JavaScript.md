# Lesson 6 - Objected Orientation - Constructors, Prototypal Inheritance, & Object Composition

## Recap & Intro
- So far we've covered JS fundamentals, this is the last topic in that series
- Today we're going to be talking about Object Oriented programming and Inheritance in JS.


## Object Orientation
Object-oriented programming (OOP) is a programming model organized around objects rather than "actions". That is, data rather than logic. While JS is more suited to functional programming, it does have some OO features that we need to understand.

Some key concepts in OO:

- Class - A template for a new object
- Instance - A single object created from a class
- Inheritance - An object can inherit properties from a parent object
- Encapsulation - Enclosing an object's data and functionality inside of it. (like the slideshow)

JS has some OO features.

### Classes
In JS, you create a class by simply defining a constructor. A constructor is a function used to create a new object instance. Like an object factory.

```javascript
function Teacher(name) {
	this.name = name;
	this.teach = function() {
		console.log(this.name + " says constructors are cool");
	}
}

const teacher1 = new Teacher('Shane');
const teacher2 = new Teacher('Assaf');

teacher1.teach();
teacher2.teach();
```

### Book Example

```JavaScript
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    getSummary() {
        return `${this.title} was written by ${this.author}
        in ${this.year}.`;
    }
    getAge() {
        const age = new Date().getFullYear() - this.year;
        return `${this.title} is ${age} years old.}`;
    }
    revise(newYear) {
        this.year = newYear;
        this.revised = true;
    }
    static topBookStore() {
        return "Barnes & Noble";
    }
}

class Magazine extends Book {
    constructor(title, author, year, month) {
        super(title, author, year);
        this.month = month;
    }
}
const book = new Book("book one", "a Person", "2019");
const noot = new Book("Lerd Of the Rungs", "JJ Turken", "2001");
const boot = new Book();
boot.title = "new book";


console.log(book.getSummary());

const mag = new Magazine("mag one", "a dude", "2018", "April");

console.log(mag.getSummary());
console.log(book.getAge());

console.log(Book.topBookStore());
```

- The `new` keyword calls the function and returns the resulting object.
- Attributes are assigned to the object using `this` keyword
- Use this pattern when you need to create an object repeatedly.
- Note we're passing arguments into the constructor to customize our object

## Constructor Exercise

Write a `Particle` constructor function

- The constructor takes `startX` and `startY` parameters
- Particle will have a property of `x` that defaults to the value of the argument `startX`
- Particle will have a property of `y`that defaults to the value of the argument `startY`
- Particle will have a property of `velocity` that defaults to {x: 0, y: 0}
- Create an empty array named `particles`
- Write loop to create 100 particles
	- x values will be assigned from 0-99
	- y will be random from 0 to 500 (`Math.random()*500`)

## Constructor Exercise Answer
```javascript
console.log("answer here")
```

## Inheritance (Classical vs Prototypal)

- Java and C use Classical Inheritance
	- Classical Inheritance models the world in terms of classes
	- Think of classes as templates
	- E.g. A `Teacher` class that inherits a `Person` class.

- JavaScript uses Prototypal inheritance
	- JavaScript inheritance is INSTANCE BASED.
	- JavaScript achieves inheritance using a "prototype" object.

### Simple example
In the following example, shane inherits properties from the Teacher prototype object.

```javascript
function Teacher(name) {
	this.name = name;
}

Teacher.prototype = {
	teach: function(){
		console.log('Prototypes are important, says ' + this.name);
	}
}

const shane = new Teacher('shane');
shane.teach();
```

How is this different than just using constructors?
- A prototype object is a live instance
- The prototype object is shared across all instances.

```javascript
function Teacher() {}

Teacher.prototype = {
	disposition: 'evil'
}

const shane = new Teacher();
const assaf = new Teacher();
console.log(shane.disposition, assaf.disposition) //evil, evil

Teacher.prototype.disposition = 'happy';
console.log(shane.disposition, assaf.disposition) //happy, happy
```

### Constructors vs Prototype
These two techniques seem pretty similar. When would you use one over the other?
- **Constructors**
	- Once an instance is created, it no longer has a connection to the class or other instances.
- **Prototype**
 	- Gives you the power to control many instances after creation
	- Is more memory efficient because it removes duplication

### Prototype Chain
What happens if an instance has a property with the same name as a prototype property?
```javascript
function Teacher() {}

Teacher.prototype = {
	name: 'John Doe'
}

const shane = new Teacher();
const assaf = new Teacher();

shane.name = "Shane";

console.log(shane.name, assaf.name) //'Shane', 'John Doe'
```

If `name` is a prototype property, how come changing it didn't change both instances' names?
- This works just like scope chains
- A property name is resolved by looking at the instance first. If the instance doesn't have a property with that name, then JS looks at the instance's prototype.
- Defining a property on an instance just covers over the prototype's property. It doesn't replace it.
- Think of instance properties as being "layered" on top of the prototype

Prototype objects can have their own prototypes, resulting in a prototype chain. To resolve a property, the interpreter will look at the instance, then it's prototype, then its prototype's prototype, and so on.

Just for argument's sake:

```javascript
function Person(){
	this.brain = true;
};
function Student(){
	this.computer = true;
};
function Graduate(){
	this.skillz = 'Mad'
};

const p = new Person();
Student.prototype = p;

const s = new Student();
Graduate.prototype = s;

const g = new Graduate();

console.log(g.skillz, g.computer, g.brain);

```

### hasOwnProperty
Objects have a method called 'hasOwnProperty' that tells you if a method is defined on an instance itself or one of its parent prototypes.

```javascript
//Using example above
console.log(g.hasOwnProperty('skillz'),g.hasOwnProperty('computer')) //true,false

```
* Note - `Object.create()` is an easy way to instantiate an object based on a prototype.

Prototype chains are important to understand, but try not to create complex class hierarchies in your JS code.

### ES6 Version of Prototype Chain and hasOwnProperty
```JavaScript
class Person {
    constructor(){
        this.brain = true;
    }
}
class Student extends Person {
    constructor() {
        super();
        this.computer = false;
    }
}
class Graduate extends Student {
    constructor() {
        super();
        this.skillz = "Mad";
    }
}

const p = new Person();
Student.prototype = p; //true
const s = new Student();
Graduate.prototype = s; //false
const g = new Graduate(); //"Mad"
console.log(g.skillz, g.computer, g.brain);

//Using previous example
console.log(g.hasOwnProperty('skillz'),g.hasOwnProperty('computer')) //true,false
```

## Exercise 2: Prototypes

- Create a `time` constiable and set it to 0
- Create a `gravity` constiable and set it to 0.5
- Extend the particle class from earlier with a prototype object.
- Create a prototype object that contains:
	- A property of `getVelocity()` that returns the value (time * gravity)
	- A property of `move()`
		- `move()` should add the value from `getVelocity()` to the existing `y` position
		- If and when `y >= 500` `move()` should instead do the following: `console.log('bottom')`  
- use your existing array and for loop to create a particles array
- Use `setInterval` at 100ms to
	- increment the global `time` constiable by 1
	- `console.log` all the particle's `x` values
	- also `return` an array with all of the `y` values that are less than 500 (`y < 500`)
	- take the array with `y` values  
		- call the `move()` function on EACH item



## Exercise 2: Answer
```javascript
console.log("Please Answer")

```


## Object Composition
Usually, object composition is a better pattern than inheritance. This is also called the 'mixin pattern'.

Use `Object.assign(target, [...sources])` to copy properties from one or more objects into another without connecting them

### Contrived example

```javascript
const lion = {
	roar: function(){console.log('roar')}
}

const goat = {
	kick: function(){console.log('kick')}
}

const lizard = {
	tail: true
}

const chimera = {}
Object.assign(chimera, lion, goat, lizard);

chimera.roar();
chimera.kick();
chimera.tail;
```

### Real world example
Let's say you're keeping track of multiple configuration settings for an application.

```javascript
const baseConfig = {
	appName: 'Slick',
	apiKey: 'secretPassword',
	apiBaseUrl: 'http://slickapp.co/api/'
}

const localConfig = Object.assign({}, baseConfig, {
	apiKey: 'localPassword',
	apiBaseUrl: 'http://localhost:3000/api'
});

console.log(localConfig.name, localConfig.apiBaseUrl);
```

Let's say you're getting updated user settings from an API, but you don't want to send the whole settings object every time regardless of what's changed.


## Exercise 3: Mixins
- Create a user profile object that contains properties for
	- name
	- address
	- city
	- state
	- zipcode
	- avatar
- Write a function `getProfileUpdate()` that changes something about the current profile. For now, just hard code the return value. *Unless you're brave enough to get user input.*
- Write a function `updateProfile()` that takes a single object of keys:values and overwrites those keys on the profile object
- Get a profile update and update the profile with it.
- log the new profile


## Exercise 3: Solution

```javascript
console.log("You get the idea")
```

## Homework
- Complete [Exercise #3](https://github.com/Kayjim/tts-js-app-dev-2019/blob/master/Lesson%2006%20-%20Object%20Orientation%20in%20JavaScript.md#exercise-3-mixins) from the class notes
  - push your solution to GitHub with the name `mixin_challenge_YOUR_INITIALS_HERE`
- Read [What you need to know about OOP in JS](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
- Complete the [Prototype](https://github.com/sporto/planetproto) Nodeschool Module
	- upload the a screenshot of the completed module on slack
- Read [this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
	- Write at least 1 sentence for each chapter, either...
		- explaining what you've learned
		- describing 1 'takeway' or 'aha! moment
	- Turn in the sentences on Slack DM


### Object Orientation
- https://vimeo.com/69255635
- https://youtu.be/wfMtDGfHWpA
- https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a#.p5acvjy5g

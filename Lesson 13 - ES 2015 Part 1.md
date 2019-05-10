# ES2015 Part 1 - Template Literals, New Variable Declarations, Default Parameters and Arrow Functions

## Recap & Intro
- Last week we learned about application setup and configuration
- We also discussed the use of loaders in your webpack config
- Tonight we'll be discussing ES2015, the newest specification of JavaScript

## Agenda

- Tonight we'll cover the changes that ES2015 offers, including:
  - Template Literals
  - new variable types `let` and `const`
  - Default Parameters
  - Arrow Functions
- The objective is for you become comfortable with the new features and syntax
- We'll also cover how to include ES2015 in your current projects

<!-- instructor note: Using Babel or JS bin (with the ES6/Babel option) is probably preferable for the lecture portion. During challenges, ask students to use webpack.config -->

## What is ES2015 

ES2015 (formerly known as ES6) is the biggest change to JavaScript to date. It offers many advantages over the current ES5 spec. While this may sound intimidating, ES6 is incredibly easy to pick up if you have a solid understanding of the core principles of JavaScript. 

After learning a bit about ES2015 this week, you'll be able to start using it immidiately. 

Though ES2015 has officially been released, the features have yet to be fully implemented in current browsers, but have no fear, with a little bit of webpack magic you can write ES2015 code and have it compile/transpile into ES5. 


## Template Literals

What are template literals? 

According to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):
>Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They were called "template strings" in prior editions of the ES2015 / ES6 specification.


- Template strings are encolsed by the back-tick( ` ) character
- instead of double(`"`) or single(`'`) quotes

```javascript
console.log(`Hello! I'm a string template`) 
// Hello! I'm a string template
```
- String templates also support multi-line strings with ease

##### *the old-fashioned way*

```javascript
console.log("string text line 1\n"+
"string text line 2");
// "string text line 1
// string text line 2"
```
##### *the ES2015 way*

```javascript
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

#### String Interpolation
String Literals also allow interpolation! That's right! no more concatenation of variables!

As you know (from experience) the only way to add variables to a string is by using concatenation with the `+` operator

##### *the old-fashioned way*

```javascript
var name = "Shane";
var day = "Tuesday";

console.log("Hello "+ name + ", I hope you have a great " + day + "!");
```
While this works, ES2015 allows you to wrap your variables with `${}`. This will take care of utlizing the value that your variable is pointing to. 

##### **the ES2015 way**

```javascript
var name = "Shane"; 
var day = "Tuesday";

console.log(`Hello ${name}, I hope you have a great ${day}!`)
```

As you can imagine this also works great with objects!

```javascript
var day = "Tuesday";
var instructor = {
	name: "Shane",
	lesson: "ES 2015"
}

console.log(`Hello ${instructor.name}, I hope the ${instructor.lesson} class goes well on ${day}!`);
```

And if you're wondering about functions, that works too!

```javascript
var instructor = {
	name: "Shane",
	lesson: "ES 2015",
	greet: function(){
	  return `Hi! I'm ${this.name} and tonight we'll be discussing ${this.lesson}!`;
	  }
}

console.log(instructor.greet());
```

## Exercise

go to [ES6Katas](http://tddbin.com/#?kata=es6/language/template-strings/basics) and pass the first 2 sets of tests

## let & const

As you've been reading more about JavaScript you may have noticed the keywords `let` and `const` being used in code snippets. This new addition to the language is both simple and powerful.

### let

In it's most basic form, `let` is a sibling of `var`. However there is a difference. 

- `var` creates a variable scoped to it's parent function (or in the global scope)
- `let` scopes the variable to it's nearest block, (`if` statements, `for` loops, etc) 

This concept is known as **block scoping**. 

##### using `var`
```javascript
function foo() {

  let x = true;
  if (x) {
    var usingVar = "I'm using the var keyword";
  }
  console.log( usingVar );
}
 
foo();
// I'm using the var keyword
```
In the above example, *usingVar* is hoisted to the top of the function, thus being made available throughout the function. 

##### using `let`
```javascript
function foo() {
  let x = true;
  if (x) {
    let usingLet = "I'm using the let keyword";
  }
  console.log( usingLet );
}
 
foo();
// usingLet is not defined
```
In the above example, *usingLet* is hoisted to the top of the `if` block, thus making it unavailable to the outer function's scope. 

In summary, using `let` presents many benefits, including:  

- tighter control over your variables in regards to:
	- lexical scope
	- closures
	- hoisting
- less errors at run-time
- easier debugging

### const

The `const` declaration creates a *constant*. Which is essentially a **read-only** reference to the value. 

This means that once a constant is declared, it cannot be re-assigned or re-declared. 

```javascript
const instructors = ["Assaf", "Shane"]
instructors = ["Lee", "Mariel"]

// TypeError
```
A common misconception is that `const` is immutable. This is not entirely true. If the reference value of `const` is a complex object (ie: function, array, object), the *contents can be modified*.

```javascript
const instructors = ["Assaf", "Shane"];
instructors.push("Lee", "Mariel");

console.log(instructors)
// ["Assaf","Shane","Lee","Mariel"]
```

A couple of other notes on `const`:

- variables declared with `const` can be upper or lower-case
- `const` follows the same **block scope** principles as **let**

The use of `const` and `let` gives you more control over your code and makes it much more readable for other developers. 

## Default Parameters

A welcome change in ES2015 is **default paramaters**.

This feature allows you to pass default arguments to your functions. Before we dive into the syntax, let's look at the ES5 work-around

##### *the old-fashioned way*
```javascript
function hello(name) {
  name = name || 'Mystery Person';
 
  console.log('Hello ' + name + "!");
}

hello("Bobby");
// Hello Bobby!

hello();
// Hello Mystery Person!
```
While this is a very clever work-around, it can backfire when dealing with booleans and numbers. 

ES2015 offers a much more reliable solution

##### *the ES2015 way*
```javascript
function hello(name = "Mystery Person"){
	console.log(`Hello ${name}!`);
}

hello("Bobby");
// Hello Bobby!

hello();
// Hello Mystery Person!
```

Multiple default parameters can be added and mixed with regular parameters. However, keep in mind that **parameters without *default's*  will initially recieve the value of undefined** (like normal).

```javascript
function hello(day, name = "Mystery Person"){
	console.log(`Hello ${name}! have a great ${day}`);
}

hello();
// Hello Mystery Person! have a great undefined 
```
## Exercise

- Complete challenge #57 (Default paramaters) at [ES6Katas](http://tddbin.com/?772#?kata=es6/language/default-parameters/basics)

## Arrow Functions

If you remember from lesson #5 when dealing with callbacks, you have to implement some work-arounds to keep the appropriate lexical scope. 

As a refresher:

```javascript
const teacher = {
    name: 'Shane',
    speak: function() {

        let boundFunction = function(){
            console.log('later my name is ' + this.name);
        }

        setTimeout(boundFunction,1000);
    }
}

teacher.speak();
// later my name is 
```

Obviously, this is not the intended result we're looking for. In ES5 there are several ways to produce the desired results. 

##### *the old-fashioned way*
```javascript
const teacher = {
    name: 'Shane',
    speak: function() {

        //Bind a function to a specific context
        let boundFunction = function(){
            console.log('later my name is ' + this.name);
        }.bind(this);

        //boundFunction will always run in bound context
        setTimeout(boundFunction,1000);
    }
}

teacher.speak();
// later may name is Shane
```

While this works, it feels like a hack.

Thankfully ES2015 solves the problem with **arrow functions**

##### *the ES2015 way*
```javascript
const teacher = {
    name: 'Shane',
    speak() {
        let boundFunction = () => {
            console.log('later my name is ' + this.name);
        }

        setTimeout(boundFunction,1000);
    }
}

teacher.speak();
//later my name is Shane
```

Doesn't that feel better? the syntax involves:

- removing the `function` keyword
- adding `()` and any appropriate arguments
- using the `=>` operator
- wrapping your function body in `{}`

This introduces the concept of *lexical binding*. <br>
Which simply means: **arrow functions bind to the scope of where they are *defined* not where they are used**


##### with an argument
```javascript
let students = [
  { name: "Edwin"}, 
  { name: "Kim"}, 
  { name: "Skip"}
];

let names = students.map((student) => student.name);

console.log(names);
// ["Edwin","Kim","Skip"]
```

Another note is that arrow functions *implicitly return* when consolidated to one line 

meaning that.. 

```javascript
let names = students.map((student) => student.name);
```

is equal to:

```javascript
let names = students.map((student) => {
    return student.name
});
```

## Exercise

- Make the tests pass for challenge #5 (arrow functions) at [ES6Katas](http://tddbin.com/?118#?kata=es6/language/arrow-functions/basics)

## Homework 

###**Due 9/1/16** 

- Complete the first 4 challenges of the [Count to 6](https://github.com/domenic/count-to-6) module at [NodeSchool](http://nodeschool.io/)
    - this includes:
        - Hello ES6
        - Template Strings
        - Arrow Functions pt 1
        - Arrow Functions  and `this`
    - send in a screenshot of the 4 completed lessons
- Complete the following modules in ES6 Katas 
    - [Challenge 1](http://tddbin.com/?251#?kata=es6/language/template-strings/basics)
    - [Challenge 2](http://tddbin.com/?169#?kata=es6/language/template-strings/multiline)
    - [Challenge 5](http://tddbin.com/?908#?kata=es6/language/arrow-functions/basics)
    - [Challenge 57](http://tddbin.com/?728#?kata=es6/language/default-parameters/basics)
 

***Note: For extra practice with ES2015 you can use the [babel.js repl](https://babeljs.io/repl/) or our [class transpiler](https://github.com/ttsJavaScriptAppDevelopmentSummer16/ES2015_transpiler)***

## Reading

[YDKJS](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond#you-dont-know-js-es6--beyond)

[For and Against Let](https://davidwalsh.name/for-and-against-let)

[ES2015 Constants](https://mathiasbynens.be/notes/es6-const)

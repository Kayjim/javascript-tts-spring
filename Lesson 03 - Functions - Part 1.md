# Lesson 3 - Functions Part 1

## Recap & Intro
- Last week we talked about arrays and objects, which hold structured data.
- What can we do with that data? This is where functions come in.
- Today we'll talk about functions, parameters, scope, closures
- JavaScript is a functional language, so it's all about the functions! 
- Functions can be difficult for people that are new to JavaScript, because they work differently than in other languages like Ruby, Java or C#.

## Function Basics
- Functions are procedures that take arguments and return values. 
- Think about them like a sheet of paper with instructions on it.

### Define a function

- A function has a name, an argument list, and a body. 
- Arguments can be named anything you want

```javascript
//Define a function
function saySomething(something) {
	console.log(something);
}
```

### Running a function
Execute a function by calling it's name with () and passing in arguments.

```javascript
saySomething('Hello function!'); //logs 'hello function!'
```

### Return values

Functions can 'return' a value. A function evaluates to its `return` value when run.<br>
*(note to Ruby Developers: Ruby _implicitly_ returns values. JS requires an _explicit_ return statement if you are expecting a return value)* 


##### Wrong

```javascript
function add(number1, number2) {
	number1 + number2;
}

var sum = add(1,2);
console.log(sum) // undefined
```

##### Right

```javascript
function add(number1, number2) {
	return number1 + number2;
}

var sum = add(1,2);
console.log(sum); // 3
```

### Function Arguments
All functions take any number of arguments, regardless of their declared signature.

```javascript
function add(a,b) {
	console.log(a,b)
}

add(1); // '1,undefined'
add(1,2,3,4,5) // '1,2'
``` 

The arguments list simply creates variables that reference the arguments in order they were passed. For functions that take an unknown number of arguments, use the `arguments` object.

```javascript
function add() {
	var sum = 0;
	for(var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}
	
add(1,2,3,4,5,6,7,8);
```

## Exercise 1 (function basics)

Calculating gratutity is a repetitive task, so let's create a couple of functions that do the work for us.

- create a variable titled `billAmount` and store a random number (ie: 100)
- create a function titled `gratuity()`
	- gratutity should: 
		- multiply the value of billAmount by 20% <br> *hint: use 0.2*
		- return the value
- create a function titled `totalWithGrat()`
	-  totalWithGrat should:
		- take in the amount as an argument
		- call the gratutity function
		- add that to the original bill amount
		- return the total bill + gratuity
- log the total (with gratuity) to the console 
	- append new total to the following phrase: 
		- "your total including gratuity is:" 
- **Limitation: You can only invoke the totalWithGrat function when logging the result**

**Jimmy's Bonus Question**

- Find a way to fix the decimal point to only 2 places, ie: 100.00 <br> *(hint: the answer is in the sentence above)*

### Exercise 1 Answer:

```javascript

const billAmount = 100.58;

function gratutity(){
    return billAmount * 0.2;  
  }

function totalWithGrat(amount){
  return gratuity() + amount;
}

console.log("your total, including gratutity is: $" +  totalWithGrat(billAmount).toFixed(2));
```

## Functions as Objects

- Functions are first class Objects in JavaScript.
- This means they can be: 
	- instantiated
	- assigned
	- reassigned 
	- and passed around just like any other variable.
- Again, think of them as a physical piece of paper.

### Functions as Variables
Like other objects, functions can be assigned to variables.

```javascript
var add = function(a,b){return a + b};
```

The difference between declaring a function that way (Function assignment) and the `function add(){}` syntax we've been using (Function Declaration) is that the latter hoists both the declaration and definition. For example:

##### Function Declaration
```javascript
hoisted(); // logs "foo"

function hoisted() {
  console.log("foo");
}
```

##### Function Assignment

```javascript
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
   console.log("bar");
};
```

In the above example, we get a `TypeError` because `notHoisted()` is declared, but undefined *until* the assignment expression `var notHoisted = `.

### Anonymous Functions

- It's often handy to declare a function on the fly without a name.
- This is VERY common

```javascript

var calculator = {
	add: function(a,b) {
		return a + b;
	}
}

calculator.add(2,3) // 5
```

So, what is the point of an Anonymous function? 

- Cleaner code
- Scope management, used to create private scope (more on that later)
- Super useful with Closures (more on that later as well)


While, this might look strange, but you've already been doing this with Arrays and Objects. Functions are no different.

```javascript
var arrayOfMystery = [
	['anonymous','array'],
	{ name: 'anonymous object' },
	function(){ return 'Anonymous Function!'}
]

console.log(arrayOfMystery[0][1]) // array
console.log(arrayOfMystery[1].name) // anonymous object
console.log(arrayOfMystery[2]()) // anonymous function!

```
- `[ ]` creates an array in memory
- `{ }` creates an object in memory
- `function(){ }` creates an object in memory


## Exercise 2 (RPS Revisited)

Let's revisit Rock Paper Scissors...

1. Define a `hands` array with the values 'rock', 'paper', and 'scissors';
2. Define a function called `getHand()` that returns a hand from the array using `parseInt(Math.random()*10)%3` 
4. Define two objects for two players. Each player has `name` and `getHand()` properties.
5. Define a function called `playRound()` that 
 	- Takes two player objects as arguments 
 	- Gets hands from each
 	- Determines the winner
 	- Logs the hands played and name of the winner.
 	- If its a tie, log the hands played and "it's a tie".
 	- Returns the winner object (null if no winner)
6. Define a function called `playGame()` that takes arguments `player1`, `player2`, and `playUntil`.
	- Play rounds until one of the players wins `playUntil` hands
	- When one player has won enough games, return the winning player object
7. Play a game to 5 wins

**Jimmy's Bonus Questions**

- Define a function caled `playTournament()`
	- Take 4 players and `playUntil` as arguments
	- Play a game between the first two players, and the second two players
	- Play a game between the winners of the first round.
	- Announce the tournament winner's name "[name] is the world champion";

##RPS Answer

```javascript
function getHand() {
  return weapons[Math.floor(Math.random() * weapons.length)];
}

const player1 = {
  name: "Chris",
  score: 0,
  getHand: getHand,
};
const player2 = {
  name: "Jimmy",
  score: 0,
  getHand: getHand,
};
const weapons = ["rock", "paper", "scissors"];

const winConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function playRound(playerA, playerB) {
  const playerAWeapon = playerA.getHand();
  const playerBWeapon = playerB.getHand();

  console.log(playerA.name, "plays", playerAWeapon);
  console.log(playerB.name, "plays", playerBWeapon);

  if (playerAWeapon === playerBWeapon) {
    // Players Tied
    return null;
  } else if (winConditions[playerAWeapon] === playerBWeapon) {
    // Player One Wins
    return playerA;
  } else {
    // Player Two Wins
    return playerB;
  }
}

const hasPlayerWon = (player, roundsToWin) => player.score >= roundsToWin;

function playGame(playerA, playerB, roundsToWin) {
  while (!(hasPlayerWon(playerA, roundsToWin) || hasPlayerWon(playerB, roundsToWin))) {
    const winningPlayer = playRound(playerA, playerB);
    if (winningPlayer) {
      console.log(winningPlayer.name, "won!");
      winningPlayer.score++;
    } else {
      console.log("Its a tie!");
    }
  }

  let winner;
  if (hasPlayerWon(playerA, roundsToWin)) {
    winner = playerA;
  } else {
    winner = playerB;
  }
  console.log(winner.name, "wins the game!");
}

console.log(playGame(player1, player2, 5));
```
	
- - - -

## Homework

- Complete the new [Rock Paper Scissors Challenge](https://github.com/Kayjim/tts-js-app-dev-2019/blob/master/Lesson%2003%20-%20Functions%20-%20Part%201.md#exercise-2-rps-revisited)
  - Push completed to GitHub with the name: `RPS_functions_YOUR_INITIALS_HERE`
-  Complete the [JavaScripting Module](https://github.com/sethvincent/javascripting) at [NodeSchool](http://nodeschool.io/)
	- Upload a completed screenshot to Slack
- Read the [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures) book on closures. (chapters 1 - 5)
	- Complete the code examples
	- push to github with the name: `YDKJS_closures_YOUR_INITIALS_HERE`


## Reading
- [http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)


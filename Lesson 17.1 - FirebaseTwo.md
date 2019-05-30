# Firebase

## What is a Database

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS). Together, the data and the DBMS, along with the applications that are associated with them, are referred to as a database system, often shortened to just database.

Data within the most common types of databases in operation today is typically modeled in rows and columns in a series of tables to make processing and data querying efficient. The data can then be easily accessed, managed, modified, updated, controlled, and organized. Most databases use structured query language (SQL) for writing and querying data.

## Functional vs Relational Databases

Relational database management systems (RDBMS) support the relational (=table-oriented) data model. The schema of a table (=relation schema) is defined by the table name and a fixed number of attributes with fixed data types. A record (=entity) corresponds to a row in the table and consists of the values of each attribute. A relation thus consists of a set of uniform records.

Functional databases such as the Realtime Database that is used in Firebase use a JSON tree to store data. It also returns data in the same form, making it  work quite well with things like React. 

## Setup

To add Fire base to an existing project, simply add the config to the top of the file:  

```javascript 
let config = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
};

```

This is found in your Firebase console. After doing this, you need to setup the database: 

```javascript
firebase.initializeApp(config);

const database = firebase.database();
```

## Creating Your First Project with Firebase

First, create a new React app. Then implement the Firebase config information at the top of the App.js file. 

## Getting Data

To retrieve data from Firebase, you need to place the code in the `componendDidMount()` method. 

```javascript
componentDidMount() {
    const imageRef = database.ref("image/");
    const speedRef = database.ref("speed/");
    imageRef.on("value", snapshot => {
      snapshot.val() == null
        ? this.setState({ image: logo })
        : this.setState({ image: snapshot.val() });
    });
    speedRef.on("value", snapshot => {
      this.setState({
        speed: snapshot.val()
      });
    });
}
```
## Writing Data

To write data to the database you have to use either the `.set()` or `.push()` functions. 

The `.set()` function replaces the data that is there, and `.push()` simply adds it after the existing data.

```javascript
writeData = e => {
    e.preventDefault();
    const image = e.target.elements.imageForm.value;
    const speed = e.target.elements.speed.value;

    database.ref("image/").set(image, function(error) {
      if (error) {
        alert("That didn't work, please try again.");
      } else {
        console.log("Successful submit!");
      }
    });
    database.ref("speed/").set(speed, function(error) {
      if (error) {
        alert("That didn't work, please try again.");
      } else {
        console.log("Successful submit!");
      }
    });
  };

```

```javascript 
resetImage = e => {
    e.preventDefault();
    database.ref("image/").set(null, function(error) {
      if (error) {
        alert("That didn't work, please try again.");
      } else {
        console.log("Successful submit!");
      }
    });
  };
```

```javascript 
changeSpeed = e => {
    const speed = e.target.value;
    e.preventDefault();
    database.ref("speed/").set(speed, function(error) {
      if (error) {
        alert("That didn't work, please try again.");
      } else {
        console.log("Successful submit!");
      }
    });
  };
```

```javascript
<img
  src={this.state.image}
  alt="logo"
  style={{
    animation: `App-logo-spin infinite ${this.state.speed}ms linear`,
    height: "40vmin",
    pointerEvents: "none"
  }}
```

## Promises

To know when your data is committed to the Firebase Realtime Database server, you can use a Promise. Both `set()` and `update()` can return a Promise you can use to know when the write is committed to the database.

## Exercise 1: 

Create the default react app.

- Add an input box with a submit button that can change the image that is spinning when the button is clicked. 
- Use state to do this. But all data must pass though firebase, so that it is persistent, even when the app is closed and reopened. 
- Add a reset button next to it that changes the image back to the default one. 
- For bonus points add a slider that controls the speed of the spinning image. 

## Reading
- [Firebase Documentation](https://firebase.google.com/docs/database/web/start?authuser=0)
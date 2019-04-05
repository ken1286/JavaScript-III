/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. This will bind to the window when in the global scope.
* 2. Implicit binding means that this refers to the object before the preceding dot when a      function is called.
* 3. New binding means that this refers to the instance of the object that is created and       returned by the constructor function.
* 4. Explicit binding means whenever the call() or apply() methods are used, this is            called in a new explicit context.
*
* write out a code example of each explanation above
*/

// Principle 1
console.log(this);
// code example for Window Binding


// Principle 2
const newObj = {
  "name": "Bob",
  "greeting": "Hi",
  "sayHi": function() {
    console.log(`${this.greeting} Pam`);
  }
}

newObj.sayHi();
// code example for Implicit Binding


// Principle 3
function newPerson(name, job) {
  this.greeting = 'Hi';
  this.name = name;
  this.job = job;
  this.speak = function() {
    return `My name is ${this.name} and my job is ${this.job}.`;
  }
}

const mike = new newPerson('Mike', 'designer');
const anne = new newPerson('Anne', 'coder');

console.log(mike.speak());
console.log(anne.speak());
// code example for New Binding


// Principle 4
console.log(mike.speak.call(anne));

var person = {
  name: 'Bob',
  job: 'mailman'
};
console.log(anne.speak.call(person));
// code example for Explicit Binding
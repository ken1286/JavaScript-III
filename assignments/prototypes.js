/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(attributes) {
  this.createdAt = attributes.createdAt;
  this.name = attributes.name;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attributes) {
  GameObject.call(this, attributes);
  this.healthPoints = attributes.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(){
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attributes) {
  CharacterStats.call(this, attributes);
  this.team = attributes.team;
  this.weapons = attributes.weapons;
  this.language = attributes.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function(){
  return `${this.name} offers a greeting in ${this.language}`;
}
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/




// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
  function Villain(attributes) {
    Humanoid.call(this, attributes);
  }

  function Hero(attributes) {
    Humanoid.call(this, attributes);
  }

  Villain.prototype = Object.create(Humanoid.prototype);
  Hero.prototype = Object.create(Villain.prototype);
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;

  Villain.prototype.attack = function(object) {
    object.healthPoints -= Math.floor(Math.random() * 5) + 1;
    return `${this.name} savagely attacks ${object.name}.\n${object.name}'s healthpoints are now ${object.healthPoints}`;
  };

  Villain.prototype.fight = function(object) {
//     if(object.healthPoints <= 0) {
//       return `${this.name} savagely attacks ${object.name}.
// ${object.takeDamage()}
// Their healthpoints are now ${object.healthPoints}
// ${object.destroy()}`;
//     }
//     else {
//       this.attack(object);
//       return `${this.name} savagely attacks ${object.name}.
// ${object.takeDamage()}
// Their healthpoints are now ${object.healthPoints}`;
// }
    while(object.healthPoints > 0 && this.healthPoints > 0) {
      console.log(this.attack(object));
      console.log(object.attack(this));
      // object.healthPoints -= Math.floor(Math.random() * 5) + 1;
      // this.healthPoints -= Math.floor(Math.random() * 5) + 1;
      // console.log(`${this.name} savagely attacks ${object.name}.\n${object.name}'s healthpoints are now ${object.healthPoints}`)
      // console.log(`${object.name} brutally attacks ${this.name}.\n${this.name}'s healthpoints are now ${this.healthPoints}`)
    }

    if(object.healthPoints <= 0 && this.healthPoints <= 0) {
      return [ object.destroy(), this.destroy() ];
    } else if (object.healthPoints <= 0) {
      return object.destroy();
    } else {
      return this.destroy();
    }
    // commented out first test when I thought of a while loop
  };

  // * Create two new objects, one a villain and one a hero and fight it out with methods!
  const bob = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 3,
    },
    healthPoints: 20,
    name: `Bob`,
    team: `Evil Knights of Death`,
    weapons: [
      `Flaming Sword`,
      `Bow of Destruction`,
    ],
    language: `Evilese`,
  });

  const jane = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 20,
    name: `Jane`,
    team: `Good Wizards of Happiness`,
    weapons: [
      `Blessed Staff of Wizardry`,
      `Friendly Dagger of Pointiness`,
    ],
    language: `Goodish`,
  });

  // console.log(bob.fight(archer));
  console.log(bob.attack(mage));
  console.log(jane.attack(archer));
  console.log(bob.fight(jane));
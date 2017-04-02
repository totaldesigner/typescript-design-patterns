module Memento {
  class PersonMemento {
    constructor(public firstName: string, public lastName: string, public age: number) {
    }
  }

  export class Person {
    constructor(public firstName: string, public lastName: string, public age: number) {
    }

    public GetMemento(): any {
      return new PersonMemento(this.firstName, this.lastName, this.age);
    }

    public RestoreMemento(state: any) {
      var personState = <PersonMemento>state;
      this.firstName = personState.firstName;
      this.lastName = personState.lastName;
      this.age = personState.age;
    }

    public display() {
      console.log(this.firstName + " | " + this.lastName + " | " + this.age);
    }
  }
}

window.addEventListener("load", function () {
  var mementos = new Array();

  var person = new Memento.Person("Wesley", "Bakker", 36);
  person.display();

  mementos.push(person.GetMemento());

  person.firstName = "Sam";
  person.age = 3;
  person.display();

  mementos.push(person.GetMemento());

  person.firstName = "Imen";
  person.lastName = "ben Jeddou"
  person.age = 36;
  person.display();

  mementos.push(person.GetMemento());

  person.RestoreMemento(mementos[0]);
  person.display();

  person.RestoreMemento(mementos[1]);
  person.display();

  person.RestoreMemento(mementos[2]);
  person.display();
});
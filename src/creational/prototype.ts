module Prototype {
  class Prototype {
    constructor(public name: string, public modified: Date = new Date()) {
    }

    public display() {
      console.log("My name is " + this.name + " and a was modified at " + this.modified);
    }

    public clone(): Prototype {
      var cloned = Object.create(Prototype.prototype || null);
      Object.keys(this).map((key: string) => {
        cloned[key] = this[key];
      });

      return cloned;
    }
  }

  window.addEventListener("load", function () {
    var firstOne = new Prototype("First");
    firstOne.display();
    var clone = firstOne.clone();
    clone.display();
    clone.name = "Norbert"

    firstOne.display();
    clone.display();
  });
}
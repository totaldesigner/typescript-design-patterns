module Singleton {
  class Singleton {
    public counter: number = 0;
    private static _instance: Singleton = null;

    constructor() {
      if (Singleton._instance) {
        throw new Error("Error: Instantiation failed: Use Singleton.current instead of new.");
      }

      Singleton._instance = this;
    }

    public static get current(): Singleton {
      if (Singleton._instance === null) {
        Singleton._instance = new Singleton();
      }

      return Singleton._instance;
    }

    public display() {
      console.log("The Singleton counter has a value of:" + this.counter);
    }
  }

  window.addEventListener("load", function () {
    var singleton1 = Singleton.current;
    singleton1.display();

    var singleton2 = Singleton.current;
    singleton2.counter++;
    singleton1.display();

    try {
      var singleton3 = new Singleton();
    } catch (error) {
      console.log(error.message);
    }

    singleton2.counter++;
    singleton1.display();
  });
}
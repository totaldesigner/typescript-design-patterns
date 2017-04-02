module Iterator {
  interface IEnumerable {
    [index: number]: any;
    length: number;
  }

  interface IIterator {
    reset(): void;
    moveNext(): boolean
    current: any;
  }

  export class Enumerator implements IIterator {
    protected _index: number;
    protected _items: IEnumerable;
    protected _max: number;

    constructor(items: IEnumerable) {
      this._items = items;
      this.reset();
    }

    public reset(): void {
      this._index = -1;
      this._max = this._items.length - 1;
    }

    public moveNext(): boolean {
      return (this._index++ < this._max);
    }

    get current(): any {
      if (this._index < 0 || this._index > this._max) {
        throw new Error("Invalid operation.");
      }

      return this._items[this._index];
    }
  }


  window.addEventListener("load", function () {
    var persons = new Array("Wesley", "Norbert", "Sam", "Sridhar");
    var h2Nodes = document.getElementsByTagName("h2");

    console.log("Iterating through the array.");
    var enumerator = new Enumerator(persons);
    while (enumerator.moveNext()) {
      console.log(enumerator.current);
    }

    console.log("Iterating through a NodeListOf<HTMLHeadingElement>.");
    var nodesEnumerator = new Enumerator(h2Nodes);
    while (nodesEnumerator.moveNext()) {
      console.log(nodesEnumerator.current.textContent);
    }
  });
}
module Strategy {
  interface ISortStrategy<T> {
    sort<T>(items: Array<T>, comparer: (left: T, right: T) => number);
  }

  class StandardSortStrategy<T> implements ISortStrategy<T> {
    public sort<T>(items: Array<T>, comparer: (left: T, right: T) => number) {
      items = items.sort(comparer);
    }
  }

  class InsertionSortStrategy<T> implements ISortStrategy<T> {
    public sort<T>(items: Array<T>, comparer: (left: T, right: T) => number) {
      var len = items.length;
      if (len < 2) {
        return;
      }

      var j = 0;
      var previous: T, left: T = items[0];

      for (var i = 1; i < len; i++) {
        previous = left;
        left = items[i];

        j = (comparer(previous, left) <= 0) ? ++j : 0;

        while (j < i) {
          var right = items[j];
          if (comparer(left, right) < 0) {
            items.splice(i, 1);
            items.splice(j, 0, left);
            break;
          } else {
            j++;
          }
        }
      }
    }
  }

  class MergeSortStrategy<T> implements ISortStrategy<T> {
    public sort<T>(items: Array<T>, comparer: (left: T, right: T) => number) {
      if (items.length < 2) {
        return items;
      }

      var sortedArrays: Array<Array<T>> = items.map((value) => { return [value]; });

      var leftArray: Array<T>, rightArray: Array<T>;
      while (sortedArrays.length > 1) {
        leftArray = sortedArrays.shift();
        rightArray = sortedArrays.shift();

        var result = new Array<T>();
        var left = leftArray.shift();
        var right = rightArray.shift();

        do {
          if (comparer(left, right) <= 0) {
            result.push(left);
            left = leftArray.shift();
          } else {
            result.push(right);
            right = rightArray.shift();
          }
        } while (left !== undefined && right !== undefined)

        while (left !== undefined) {
          result.push(left);
          left = leftArray.shift();
        }

        while (right !== undefined) {
          result.push(right);
          right = rightArray.shift();
        }

        sortedArrays.push(result);
      }

      var sortedItems = sortedArrays[0];
      for (var i = 0; i < items.length; i++) {
        items[i] = sortedItems.shift();
      }
    }
  }

  class SortableList<T>{
    private _items: Array<T> = new Array<T>();
    constructor(items: Array<T>) {
      this.sortStrategy = new StandardSortStrategy<T>();
      this._items = this._items.concat(items);
    }

    public add(items: Array<T>) {
      this._items = this._items.concat(items);
    }

    public get items(): Array<T> {
      return this._items;
    }

    public sortStrategy: ISortStrategy<T>;
    protected comparer: (left: T, right: T) => number = (left: T, right: T) => { return (left < right) ? -1 : 1; };

    public sort() {
      this.sortStrategy.sort(this._items, this.comparer);
    }
  }

  class SortableNumberList extends SortableList<number>{
    constructor(items: Array<number>) {
      super(items);
    }
  }

  window.addEventListener("load", function () {
    var randomNumbers = new Array<number>();
    var lenght = 50;
    while (lenght--) {
      randomNumbers.push(Math.round(Math.random() * 1000));
    }

    var sortableList1 = new SortableNumberList(randomNumbers);
    sortableList1.sort();
    console.log("Sorted using the standard sort strategie:");
    console.log(sortableList1.items.join("|"));

    var sortableList2 = new SortableNumberList(randomNumbers);
    sortableList2.sortStrategy = new MergeSortStrategy<number>();
    sortableList2.sort();
    console.log("Sorted using the merge sort strategie:");
    console.log(sortableList2.items.join("|"));

    var sortableList3 = new SortableNumberList(randomNumbers);
    sortableList3.sortStrategy = new InsertionSortStrategy<number>();
    sortableList3.sort();
    console.log("Sorted using the insertion sort strategie:");
    console.log(sortableList3.items.join("|"));
  });
}
module Visitor {
  interface IElementVisitor {
    visitElement(element: Element): void;
    visitElementNode(elementNode: ElementNode): void;
  }

  class Element {
    private _name: string;
    private _parent: ElementNode;

    constructor(name: string, parent?: ElementNode) {
      if (!name) {
        throw new Error("Argument null exception!");
      }

      this._name = name;
      this._parent = parent;
    }

    public get name(): string {
      return this._name;
    }

    public get parent(): ElementNode {
      return this._parent;
    }

    public set parent(value: ElementNode) {
      this._parent = value;
    }

    public get depth(): number {
      if (this._parent) {
        return this._parent.depth + 1;
      }

      return 0;
    }

    public accept(visitor: IElementVisitor): void {
      visitor.visitElement(this);
    }
  }

  class ElementNode extends Element {
    private _children = new Array<Element>();

    constructor(name: string, parent?: ElementNode) {
      super(name, parent);
    }

    public get length(): number {
      return this._children.length;
    }

    public appendChild(child: Element): ElementNode {
      child.parent = this;
      this._children.push(child);
      return this;
    }

    public accept(visitor: IElementVisitor): void {
      visitor.visitElementNode(this);
      this._children.forEach(function (child) {
        child.accept(visitor);
      });
    }
  }

  class LogWriter implements IElementVisitor {
    visitElement(element: Element): void {
      console.log("Visiting the element: '" + element.name + "'");
    }

    visitElementNode(elementNode: ElementNode): void {
      console.log("Visiting the element node: '" + elementNode.name + "'. Which has: " + elementNode.length + " child nodes.");
    }
  }

  class ConsoleWriter implements IElementVisitor {
    visitElement(element: Element): void {
      console.log("Visiting the element: '" + element.name + "'");
    }

    visitElementNode(elementNode: ElementNode): void {
      console.log("Visiting the element node: '" + elementNode.name + "'. Which has: " + elementNode.length + " child nodes.");
    }
  }

  window.addEventListener("load", function () {
    var constructedTree = new ElementNode("first").appendChild(new Element("firstChild"))
      .appendChild(new ElementNode("secondChild").appendChild(new Element("furtherDown")));
    var logwriter = new LogWriter();
    constructedTree.accept(logwriter);

    var consolewriter = new ConsoleWriter();
    constructedTree.accept(consolewriter);
  });
}
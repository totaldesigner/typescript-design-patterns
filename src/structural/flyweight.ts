module Flyweight {
  interface IWriter {
    write(content: string): void;
  }

  enum Style {
    Block,
    Inline
  }

  enum Color {
    Red,
    Green,
    Blue
  }

  class Writer {
    constructor(public tagName: string, public color: Color) {
    }

    write(content: string) {
      console.log("<" + this.tagName + " style='color:" + Color[this.color] + "'>" +
        content +
        "");
    }
  }

  class BlockWriter extends Writer {
    constructor(color: Color) {
      super("div", color);
    }
  }

  class InlineWriter extends Writer {
    constructor(color: Color) {
      super("span", color);
    }
  }

  class FlyWeightWriterFactory {
    static _elements = {};
    static getWriter(style: Style, color: Color): IWriter {
      var key = style.toString() + color.toString();
      if (!this._elements[key]) {
        switch (style) {
          case Style.Block:
            this._elements[key] = new BlockWriter(color);
            break;
          case Style.Inline:
            this._elements[key] = new InlineWriter(color);
            break;
        }
      }

      var retVal = this._elements[key];
      return retVal;
    }
  }

  class HtmlElement {
    private writer: IWriter;
    constructor(style: Style, color: Color) {
      this.writer = FlyWeightWriterFactory.getWriter(style, color);
    }

    private _content: string;
    public get content(): string {
      return this._content;
    }

    public set content(value: string) {
      this._content = value;
    }

    public write(): void {
      this.writer.write(this.content);
    }
  }

  window.addEventListener("load", function () {
    for (var i = 0; i < 100; i++) {
      var style = Math.floor(Math.random() * 2);
      var color = Math.floor(Math.random() * 3);

      var element = new HtmlElement(style, color);
      element.content = "This element uses a flyweight for rendering!";
      element.write();
    }
  });
}
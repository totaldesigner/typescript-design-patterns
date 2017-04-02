module Command {
  interface ICommand {
    execute(): void;
    undo(): void;
  }

  class StyleCommand implements ICommand {
    private previousValue: string;
    constructor(private receiver: HTMLElement,
      private propertyName: string,
      private value: string) {
    }

    execute() {
      this.previousValue = this.receiver.style[this.propertyName];
      this.receiver.style[this.propertyName] = this.value;
    }

    undo() {
      this.receiver.style[this.propertyName] = this.previousValue;
    }
  }

  class BackgroundColorCommand extends StyleCommand {
    constructor(receiver: HTMLElement, value: string) {
      super(receiver, "backgroundColor", value);
    }
  }

  class TextAlignCommand extends StyleCommand {
    constructor(receiver: HTMLElement, value: string) {
      super(receiver, "textAlign", value);
    }
  }

  class Invoker {
    private commands = new Array();
    private current = -1;

    constructor() {
    }

    ExecuteCommand(command: ICommand) {
      if (this.commands.length - 1 > this.current) {
        var next = this.current + 1
        this.commands.splice(next, this.commands.length - next);
      }

      this.commands.push(command);
      command.execute();
      this.current = this.commands.length - 1;
    }

    public undo() {
      if (this.current >= 0) {
        this.commands[this.current--].undo();
      }
    }

    public redo() {
      if (this.current < this.commands.length - 1) {
        this.commands[++this.current].execute();
      }
    }
  }

  window.addEventListener("load", function () {
    var ribbon = document.getElementById("commandRibbon");
    var receiver = document.getElementById("receiver");
    var invoker = new Invoker();

    var undoRedoButtons = ButtonFactory.createUndoRedoButtons(invoker);
    ribbon.appendChild(undoRedoButtons);

    var textAlignButtons = ButtonFactory.createTextAlignButtons(receiver, invoker);
    ribbon.appendChild(textAlignButtons);

    var colorButtons = ButtonFactory.createColorButtons(receiver, invoker);
    ribbon.appendChild(colorButtons);
  });


  class ButtonFactory {
    static createColorButtons(receiver: HTMLElement, invoker: Invoker): HTMLDivElement {
      var colorButtons = document.createElement("DIV");
      colorButtons.className = "colorButtons";

      var clr = new Array('00', '40', '80', 'c0', 'ff');
      var clrLength = clr.length;
      for (var i = 0; i < clrLength; i++) {
        var r = "#" + clr[i];
        for (var j = 0; j < clrLength; j++) {
          var rg = r + clr[j];
          for (var k = 0; k < clrLength; k++) {
            var rgb = rg + clr[k];
            var colorButton = ButtonFactory.createButton(null, rgb);
            colorButton.style.backgroundColor = rgb;
            colorButtons.appendChild(colorButton);
          }
        }
      }

      colorButtons.addEventListener("click", (event: any) => {
        var elem = event.target;
        var elem = event.target;
        if (elem.tagName === "BUTTON") {
          event.preventDefault();
          var button = elem;
          var command = new BackgroundColorCommand(receiver, button.value);
          invoker.ExecuteCommand(command);
        }
      });

      return <HTMLDivElement>colorButtons;
    }

    static createTextAlignButtons(receiver: HTMLElement, invoker: Invoker): HTMLDivElement {
      var textAlignButtons = document.createElement("DIV");
      textAlignButtons.className = "textAlignButtons";

      textAlignButtons.appendChild(ButtonFactory.createButton("Left", "left"));
      textAlignButtons.appendChild(ButtonFactory.createButton("Center", "center"));
      textAlignButtons.appendChild(ButtonFactory.createButton("Right", "right"));

      textAlignButtons.addEventListener("click", (event: any) => {
        var elem = event.target;
        if (elem.tagName === "BUTTON") {
          event.preventDefault();
          var button = elem;
          var command = new TextAlignCommand(receiver, button.value);
          invoker.ExecuteCommand(command);
        }
      });

      return <HTMLDivElement>textAlignButtons;
    }

    static createUndoRedoButtons(invoker: Invoker): HTMLDivElement {
      var undoRedoButtons = document.createElement("DIV");
      undoRedoButtons.className = "undoRedoButtons";

      undoRedoButtons.appendChild(ButtonFactory.createButton("Undo", "undo"));
      undoRedoButtons.appendChild(ButtonFactory.createButton("Redo", "redo"));

      undoRedoButtons.addEventListener("click", (event: any) => {
        var elem = event.target;
        if (elem.tagName === "BUTTON") {
          var button = elem;
          event.preventDefault();
          var value = button.value;
          switch (value) {
            case "undo":
              invoker.undo();
              break;
            default:
              invoker.redo();
          }
        }
      });

      return <HTMLDivElement>undoRedoButtons;
    }

    static createButton(text?: string, value?: string): HTMLButtonElement {
      var button = <HTMLButtonElement>document.createElement("BUTTON");
      button.type = "button";
      if (text) {
        button.textContent = text;
      }

      if (value) {
        button.value = value;
      }

      return button;
    }
  }
}
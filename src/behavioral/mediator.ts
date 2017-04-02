module Mediator {
  class Chat {
    private _observers: IChatObserver[] = new Array();
    constructor() {
    }

    addObserver(observer: IChatObserver) {
      this._observers.push(observer);
      this.addMessage(new ChatMessage(observer.name, "has entered the building!"),
        observer.adult);
    }

    removeObserver(observer: IChatObserver) {
      var index = this._observers.indexOf(observer);
      if (index >= 0) {
        this._observers.splice(index, 1);
        this.addMessage(new ChatMessage(observer.name, "has left the building!"),
          observer.adult);
      }
    }

    addMessage(message: ChatMessage, adult: boolean): number {
      var observers = this._observers.slice(0);
      return window.setTimeout(() => {
        observers.forEach((observer) => {
          if (observer.adult === adult) {
            observer.update(message);
          }
        })
      }, 0);
    }
  }

  class ChatMessage {
    constructor(sender: string, message: string) {
      this._sender = sender;
      this._message = message;
    }

    private _sender: string;
    public get sender(): string {
      return this._sender;
    }

    private _message: string;
    public get message(): string {
      return this._message;
    }
  }

  interface IChatObserver {
    name: string;
    adult: boolean;
    update(message: ChatMessage): void;
  }

  class ChatWindow implements IChatObserver {
    private chatWindow: HTMLElement;
    private messageBox: HTMLElement;
    private inputBox: HTMLInputElement;
    private inputButton: HTMLButtonElement;
    private closeButton: HTMLButtonElement;

    constructor(private container: HTMLElement, name: string,
      adult: boolean, private chat: Chat) {
      this._name = name;
      this._adult = adult;

      this.chatWindow = document.createElement("DIV");
      this.chatWindow.className = "chatWindow";

      var nameHeader = document.createElement("H2");
      nameHeader.innerText = this.name;
      this.chatWindow.appendChild(nameHeader);

      this.closeButton = <HTMLButtonElement>document.createElement("BUTTON");
      this.closeButton.innerText = "X";
      this.closeButton.title = "Exit";
      this.closeButton.className = "closeButton";
      this.closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.chat.removeObserver(this);
        this.container.removeChild(this.chatWindow);
      });
      this.chatWindow.appendChild(this.closeButton);

      this.messageBox = document.createElement("DIV");
      this.messageBox.className = "messageBox";
      this.chatWindow.appendChild(this.messageBox);

      var input = document.createElement("DIV");
      this.inputBox = <HTMLInputElement>document.createElement("INPUT");
      this.inputBox.type = "text";
      input.appendChild(this.inputBox);

      this.inputButton = <HTMLButtonElement>document.createElement("BUTTON");
      this.inputButton.innerText = "Send";
      this.inputButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        var message = new ChatMessage(this.name, this.inputBox.value);
        this.chat.addMessage(message, this.adult);
        this.inputBox.value = "";
      });
      input.appendChild(this.inputButton);

      this.chatWindow.appendChild(input);

      container.appendChild(this.chatWindow);

      this.chat.addObserver(this);
    }

    private _name: string;
    public get name(): string {
      return this._name;
    }

    private _adult: boolean;
    public get adult(): boolean {
      return this._adult;
    }

    public update(message: ChatMessage) {
      var senderSpanClass = (message.sender === this.name) ? "sender me" : "sender";
      var messageHtml = "<div class='message'>" +
        "<span class='" + senderSpanClass + "'&gt" + message.sender + ": </span>" +
        "<span class='message'>" + message.message + "</span>" +
        "</div>";
      this.messageBox.innerHTML += messageHtml;
    }
  }

  window.addEventListener("load", function () {
    var chat = new Chat();

    var outputDiv = document.getElementById("output");
    var chatNameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("chatNameInput");
    var chatAdultInput: HTMLInputElement = <HTMLInputElement>document.getElementById("chatAdultInput");
    var createChatButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createChatButton");
    createChatButton.addEventListener("click", (event) => {
      var name = chatNameInput.value
      var adult = chatAdultInput.checked;
      if (name) {
        new ChatWindow(outputDiv, name, adult, chat);
        chatNameInput.value = "";
      }
    });
  });
}
module ChainOfResponsibility {
  interface ICancellableEvent {
    add(eventHandler: (sender: any, eventArgs: any) => void): void;
    remove(eventHandler: (sender: any, eventArgs: any) => void): void;
  }

  interface ICancellableEventArgs {
    cancel: boolean;
  }

  class CancellableEvent implements ICancellableEvent {
    private _eventHandlers = new Array<(sender: any, eventArgs: any) => void>();

    public add(eventHandler: (sender: any, eventArgs: any) => void): void {
      if (this._eventHandlers.indexOf(eventHandler) === -1) {
        this._eventHandlers.push(eventHandler);
      }
    }

    public remove(eventHandler: (sender: any, eventArgs: any) => void): void {
      var i = this._eventHandlers.indexOf(eventHandler);
      if (i !== -1) {
        this._eventHandlers.splice(i, 1);
      }
    }

    public raise(sender: any, e: any): void {
      var eventHandlers = this._eventHandlers.slice(0);
      for (var i = 0, j = eventHandlers.length; i < j && !e.cancel; i++) {
        try {
          eventHandlers[i](sender, e);
        }
        catch (ex) { console.log(ex.message); }
      }
    }
  }

  class ValidationEventArgs implements ICancellableEventArgs {
    constructor(public value: any) {
    }

    public isValid: boolean = true;
    public cancel: boolean = false;
    public result: string;

    public status() {
      if (this.isValid) {
        console.log("The value: '" + this.value + "' is valid!");
      } else {
        console.log(this.result);
      }
    }
  }

  class ValidationChain {
    private _validators = new CancellableEvent();

    public get validators(): ICancellableEvent {
      return this._validators;
    }

    public validate(eventArgs: ValidationEventArgs): void {
      this._validators.raise(this, eventArgs);
    }
  }

  class StringValidators {
    public static nullValidator = function (sender: any, eventArgs: ValidationEventArgs) {
      if (eventArgs.value === null) {
        eventArgs.result = "String is null.";
        eventArgs.cancel = true;
        eventArgs.isValid = false;
      }
    }

    public static emptyValidator = function (sender: any, eventArgs: ValidationEventArgs) {
      if (eventArgs.value.trim().length <= 0) {
        eventArgs.result = "String is empty.";
        eventArgs.cancel = true;
        eventArgs.isValid = false;
      }
    }

    public static createLengthValidator(maxLength: number) {
      return function (sender: any, eventArgs: ValidationEventArgs) {
        if (eventArgs.value.length > maxLength) {
          eventArgs.result = "The string '" + eventArgs.value + "' is too long!";
          eventArgs.cancel = true;
          eventArgs.isValid = false;
        }
      }
    }
  }

  window.addEventListener("load", function () {
    var valuesToValidate: any[] = [null, "", "12345678910", "Valid"];

    var validationChain = new ValidationChain();
    validationChain.validators.add(StringValidators.nullValidator);
    validationChain.validators.add(StringValidators.emptyValidator);
    validationChain.validators.add(StringValidators.createLengthValidator(10));

    valuesToValidate.forEach((value) => {
      var eventArgs = new ValidationEventArgs(value);
      validationChain.validate(eventArgs);
      eventArgs.status()
    });
  });
}
module Observer {
  export interface IEvent<T> {
    add(eventHandler: (sender: any, eventArgs: T) => void): void;
    remove(eventHandler: (sender: any, eventArgs: T) => void): void;
  }

  export class Event<T> implements IEvent<T> {
    private _eventHandlers: Array<(sender: any, eventArgs: T) => void>;

    constructor() {
      this._eventHandlers = new Array<(sender: any, eventArgs: T) => void>();
    }

    public add(eventHandler: (sender: any, eventArgs: T) => void): void {
      if (this._eventHandlers.indexOf(eventHandler) === -1) {
        this._eventHandlers.push(eventHandler);
      }
    }

    public remove(eventHandler: (sender: any, eventArgs: T) => void): void {
      var i = this._eventHandlers.indexOf(eventHandler);
      if (i !== -1) {
        this._eventHandlers.splice(i, 1);
      }
    }

    public raise(sender: any, e: T): void {
      for (var i = 0, j = this._eventHandlers.length; i < j; i++) {
        try {
          this._eventHandlers[i](sender, e);
        }
        catch (ex) { /*Errors in eventhandlers should not prevent other handlers to be called.*/ }
      }
    }
  }

  export class PropertyChangedEventArgs {
    private _propertyName: string;
    private _before: any;
    private _after: any;

    constructor(propertyName: string, before?: any, after?: any) {
      this._propertyName = propertyName;
      this._before = before;
      this._after = after;
    }

    public get propertyName(): string {
      return this._propertyName;
    }

    public get before(): any {
      return this._before;
    }

    public get after(): any {
      return this._after;
    }
  }

  export interface INotifyPropertyChanged {
    propertyChanged: IEvent<PropertyChangedEventArgs>;
  }

  export class ObservableObject implements INotifyPropertyChanged {
    private _propertyChanged: Event<PropertyChangedEventArgs>;

    constructor() {
      this._propertyChanged = new Event<PropertyChangedEventArgs>();
    }

    public get propertyChanged(): IEvent<PropertyChangedEventArgs> {
      return this._propertyChanged;
    }

    protected onPropertyChanged(eventArgs: PropertyChangedEventArgs) {
      this._propertyChanged.raise(this, eventArgs);
    }
  }

  export class Employee extends ObservableObject {
    private _name: string;
    private _role: string;

    constructor(name: string, role: string) {
      super();
      this._name = name;
      this._role = role;
    }

    public get name(): string {
      return this._name;
    }

    public set name(value: string) {
      if (this._name !== value) {
        var eventArgs = new PropertyChangedEventArgs("name", this._name, value);
        this._name = value;

        this.onPropertyChanged(eventArgs);
      }
    }

    public get role(): string {
      return this._role;
    }

    public set role(value: string) {
      if (this._role !== value) {
        var eventArgs = new PropertyChangedEventArgs("role", this._role, value);
        this._role = value;

        this.onPropertyChanged(eventArgs);
      }
    }

    private _isDirty: boolean = false;
    public get isDirty(): boolean {
      return this._isDirty;
    }

    protected onPropertyChanged(eventArgs: PropertyChangedEventArgs) {
      this._isDirty = true;
      super.onPropertyChanged(eventArgs);
    }
  }


  window.addEventListener("load", function () {
    var employee = new Employee("Wesley", "Developer");

    employee.propertyChanged.add(function (sender: any, e: PropertyChangedEventArgs) {
      console.log("The property '" + e.propertyName + "' " +
        "changed from '" + e.before + "' " +
        "to '" + e.after + "'.");
    });

    employee.name = "Norbert";
    employee.role = "Lead Developer";

    employee.name = "Jos";
    employee.role = "Junior Developer";
  });
}
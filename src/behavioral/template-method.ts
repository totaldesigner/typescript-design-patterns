module TemplateMethod {
  class ItemMigrator {
    protected GetItems(): void {
      throw new Error("Not implemented!");
    }

    protected ChangeItems(): boolean {
      throw new Error("Not implemented!");
    }

    protected SaveItems(): void {
      throw new Error("Not implemented!");
    }

    public UpdateItems(): void {
      this.GetItems();
      if (this.ChangeItems()) {
        this.SaveItems();
      } else {
        console.log("Nothing has changed. Not calling SaveItems()");
      }
    }
  }

  class Person {
    public firstName: string;
    public lastName: string;
  }

  class PersonMigrator extends ItemMigrator {
    constructor() {
      super();
    }

    protected GetItems(): void {
      console.log("Getting persons.");
    }

    protected ChangeItems(): boolean {
      console.log("Changing persons.");
      return true;
    }

    protected SaveItems(): void {
      console.log("Saving persons.");
    }
  }

  class Addres {
    public street: string;
    public zipcode: string;
  }

  class AddresMigrator extends ItemMigrator {
    constructor() {
      super();
    }
    protected GetItems(): void {
      console.log("Getting addresses.");
    }

    protected ChangeItems(): boolean {
      console.log("Not changing addresses.");
      return false;
    }

    protected SaveItems(): void {
      console.log("Saving addresses.");
    }
  }

  window.addEventListener("load", function () {
    var migrators = new Array<ItemMigrator>(new PersonMigrator(), new AddresMigrator());
    migrators.forEach((migrator) => {
      migrator.UpdateItems();
    });
  });
}
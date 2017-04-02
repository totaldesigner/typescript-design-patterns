module Facade {
  class Customer {
    constructor(public name: string) {
    }
  }

  class Bank {
    public static hasSufficientSavings(customer: Customer, amount: number): boolean {
      console.log("Check bank for " + customer.name);
      return true;
    }
  }

  class Credit {
    public static hasGoodCredit(customer: Customer): boolean {
      console.log("Check credit for " + customer.name);
      return true;
    }
  }

  class Loan {
    public static hasNoBadLoans(customer: Customer): boolean {
      console.log("Check loans for " + customer.name);
      return true;
    }
  }

  class Mortgage {
    public static IsEligible(customer: Customer, amount: number): boolean {
      console.log(customer.name + " applies for a loan of " + amount + " dollar.");

      var eligible: boolean = true;

      if (!Bank.hasSufficientSavings(customer, amount)) {
        eligible = false;
      }
      else if (!Loan.hasNoBadLoans(customer)) {
        eligible = false;
      }
      else if (!Credit.hasGoodCredit(customer)) {
        eligible = false;
      }

      return eligible;
    }
  }

  window.addEventListener("load", function () {
    var customer = new Customer("Wesley Bakker");
    var elegible: boolean = Mortgage.IsEligible(customer, 1000000);
    console.log(customer.name + " has been " + (elegible ? "approved" : "rejected"));
  });
}
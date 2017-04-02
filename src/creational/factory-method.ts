module FactoryMethod {
  class Page {
    private _type: string;
    constructor(type: string) {
      this._type = type;
    }

    public get Type(): string {
      return this._type;
    }
  }

  class SkillsPage extends Page {
    constructor() {
      super("SkillsPage");
    }
  }

  class EducationPage extends Page {
    constructor() {
      super("EducationPage");
    }
  }

  class ExperiencePage extends Page {
    constructor() {
      super("ExperiencePage");
    }
  }

  class IntroductionPage extends Page {
    constructor() {
      super("IntroductionPage");
    }
  }

  class ResultsPage extends Page {
    constructor() {
      super("ResultsPage");
    }
  }

  class ConclusionPage extends Page {
    constructor() {
      super("ConclusionPage");
    }
  }

  class SummaryPage extends Page {
    constructor() {
      super("SummaryPage");
    }
  }

  class BibliographyPage extends Page {
    constructor() {
      super("BibliographyPage");
    }
  }

  class PageFactory {
    private _pages: Page[] = new Array();
    private _type: string;

    constructor(type: string) {
      this._type = type;
      this.createPages();
    }

    public get type(): string {
      return this._type;
    }
    public get pages(): Page[] {
      return this._pages;
    }

    public createPages(): void {
      throw new Error("Method not implemented");
    }
  }

  class Resume extends PageFactory {
    constructor() {
      super("Resume");
    }

    public createPages(): void {
      this.pages.push(new SkillsPage());
      this.pages.push(new EducationPage());
      this.pages.push(new ExperiencePage());
    }
  }

  class Report extends PageFactory {
    constructor() {
      super("Report");
    }

    public createPages(): void {
      this.pages.push(new IntroductionPage());
      this.pages.push(new ResultsPage());
      this.pages.push(new ConclusionPage());
      this.pages.push(new SummaryPage());
      this.pages.push(new BibliographyPage());
    }
  }

  window.addEventListener("load", function () {
    var factories: PageFactory[] = new Array(new Resume(), new Report());

    factories.forEach((factory: PageFactory) => {
      console.log("The " + factory.type + " contains the following pages:");
      factory.pages.forEach((page: Page) => {
        console.log("--" + page.Type);
      });
    });
  });
}
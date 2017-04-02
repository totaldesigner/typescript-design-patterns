module AbstractFactory {
  export class DataServiceFactories {
    private static _factories: Object = {};
    static registerDataServiceFactory(name: string, creator: () => IDataServiceFactory) {
      DataServiceFactories._factories[name] = creator;
    }

    static getDataServiceFactory(name: string): IDataServiceFactory {
      var creator = DataServiceFactories._factories[name];
      return creator();
    }
  }

  export interface IDataServiceFactory {
    name: string
    getListService(siteUrl: string): IListService;
    getListItemService(listUrl: string): IListItemService;
    getContentTypeService(siteUrl: string): IContentTypeService;
  }

  export interface IListService {
    siteUrl: string;
    getLists(): string[];
  }

  export interface IListItemService {
    listUrl: string;
    getItems(query: string): string[];
  }

  export interface IContentTypeService {
    siteUrl: string;
    getContentTypes(): string[];
  }
}

module AbstractFactory.JSOM {
  class JSOMListService implements IListService {
    constructor(public siteUrl: string) {
    }

    public getLists(): string[] {
      var result = new Array();
      /*TODO: use JSOM to fill results*/
      result.push("JSOMListResult");

      return result;
    }
  }

  class JSOMListItemService implements IListItemService {
    constructor(public listUrl: string) {
    }

    public getItems(query: string): string[] {
      var result = new Array();
      /*TODO: use JSOM to fill results*/
      result.push("JSOMListItemResult");

      return result;
    }

  }

  class JSOMContentTypeService implements IContentTypeService {
    constructor(public siteUrl: string) {
    }

    public getContentTypes(): string[] {
      var result = new Array();
      /*TODO: use JSOM to fill results*/
      result.push("JSOMContentTypeResult");

      return result;
    }
  }

  class JSOMDataServiceFactory implements IDataServiceFactory {
    private _name: string;
    public get name(): string {
      return this._name;
    }

    constructor() {
      this._name = "JSOMDataServiceFactory"
    }

    getListService(siteUrl: string): IListService {
      return new JSOMListService(siteUrl);
    }

    getListItemService(listUrl: string): IListItemService {
      return new JSOMListItemService(listUrl);
    }

    getContentTypeService(siteUrl: string): IContentTypeService {
      return new JSOMContentTypeService(siteUrl);
    }
  }
  DataServiceFactories.registerDataServiceFactory("JSOMDataServiceFactory", () => {
    return new JSOMDataServiceFactory();
  });
}

module AbstractFactory.REST {
  class RESTListService implements IListService {
    constructor(public siteUrl: string) {
    }

    public getLists(): string[] {
      var result = new Array();
      /*TODO: use REST to fill results*/
      result.push("RESTListResult");

      return result;
    }
  }

  class RESTListItemService implements IListItemService {
    constructor(public listUrl: string) {
    }

    public getItems(query: string): string[] {
      var result = new Array();
      /*TODO: use REST to fill results*/
      result.push("RESTListItemResult");

      return result;
    }
  }

  class RESTContentTypeService implements IContentTypeService {
    constructor(public siteUrl: string) {
    }

    public getContentTypes(): string[] {
      var result = new Array();
      /*TODO: use REST to fill results*/
      result.push("RESTContentTypeResult");

      return result;
    }
  }

  class RESTDataServiceFactory implements IDataServiceFactory {
    private _name: string;
    public get name(): string {
      return this._name;
    }

    constructor() {
      this._name = "RESTDataServiceFactory"
    }

    getListService(siteUrl: string): IListService {
      return new RESTListService(siteUrl);
    }

    getListItemService(listUrl: string): IListItemService {
      return new RESTListItemService(listUrl);
    }

    getContentTypeService(siteUrl: string): IContentTypeService {
      return new RESTContentTypeService(siteUrl);
    }
  }
  DataServiceFactories.registerDataServiceFactory("RESTDataServiceFactory", () => {
    return new RESTDataServiceFactory();
  });
}

window.addEventListener("load", function () {
  var DataServiceFactories = AbstractFactory.DataServiceFactories;

  var restFactory = DataServiceFactories.getDataServiceFactory("RESTDataServiceFactory");
  fetchData(restFactory);

  var jsomFactory = DataServiceFactories.getDataServiceFactory("JSOMDataServiceFactory");
  fetchData(jsomFactory);
});

function fetchData(abstractFactory: AbstractFactory.IDataServiceFactory) {
  console.log("Fetching data using: " + abstractFactory.name);
  var listService = abstractFactory.getListService("sampleSiteUrl");
  var lists = listService.getLists();
  console.log(lists.join("|"));

  var listItemService = abstractFactory.getListItemService("sampleListUrl");
  var listItems = listItemService.getItems("sampleQuery");
  console.log(listItems.join("|"));

  var contentTypeService = abstractFactory.getContentTypeService("sampleSiteUrl");
  var contentTypes = contentTypeService.getContentTypes();
  console.log(contentTypes.join("|"));
}
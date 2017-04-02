module ThirdpartyLib {
  export class StringNewsServer {
    public userName: string;
    public passWord: string;

    public getString(): string {
      /* validate userName and passWord then */
      return "StringNewsServer.newsItem1;StringNewsServer.newsItem2;StringNewsServer.newsItem3";
    }
  }

  export class ArrayNewsServer {
    public url: string;
    public getArray(): string[] {
      /* use url to fetch data then */
      return ["ArrayNewsServer.newsItem1", "ArrayNewsServer.newsItem2", "ArrayNewsServer.newsItem3"];
    }
  }
}

module News {
  export interface INewsServerInterface {
    getNews(): string[];
  }

  export class NewsLoader {
    public Load(server: INewsServerInterface) {
      var news = server.getNews();
      news.forEach((value: string) => {
        console.log(value);
      });
    }
  }

  export class StringNewsServerAdapter implements INewsServerInterface {
    private newsServer: ThirdpartyLib.StringNewsServer;
    constructor() {
      this.newsServer = new ThirdpartyLib.StringNewsServer();
      this.newsServer.userName = "userName";
      this.newsServer.passWord = "passWord";
    }

    public getNews() {
      var items = this.newsServer.getString();
      return items.split(";");
    }
  }

  export class ArrayNewsServerAdapter implements INewsServerInterface {
    private newsServer: ThirdpartyLib.ArrayNewsServer;
    constructor() {
      this.newsServer = new ThirdpartyLib.ArrayNewsServer();
      this.newsServer.url = "http://mynews.com";
    }

    public getNews() {
      return this.newsServer.getArray();
    }
  }

  window.addEventListener("load", function () {
    var newsLoader = new NewsLoader();

    var arrayNewsServer = new ArrayNewsServerAdapter();
    newsLoader.Load(arrayNewsServer);

    var stringNewsServer = new StringNewsServerAdapter();
    newsLoader.Load(stringNewsServer);
  });
}
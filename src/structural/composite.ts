module Composite {
  interface IMenuComponent {
    render(parentElement: HTMLElement): void;
  }

  interface IMenuItem extends IMenuComponent {
  }

  interface IMenu extends IMenuComponent {
    children: IMenuItem[];
  }

  class MenuItemLink implements IMenuItem {
    constructor(public displayName: string, public url: string) {
    }

    render(parentElement: HTMLElement) {
      var link: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("A");
      link.textContent = this.displayName;
      link.href = this.url;
      parentElement.appendChild(link);
    }
  }

  class MenuItemImageLink implements IMenuItem {
    constructor(public displayName: string, public url: string, public imageUrl: string) {
    }

    render(parentElement: HTMLElement) {
      var link: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("A");
      link.href = this.url;
      var img: HTMLImageElement = <HTMLImageElement>document.createElement("IMG");
      img.src = this.imageUrl;
      link.appendChild(img);

      var text = document.createTextNode(this.displayName);
      link.appendChild(text);

      parentElement.appendChild(link);
    }
  }

  class Menu implements IMenu {
    public children: IMenuItem[] = new Array();

    constructor(public displayName?: string) {
    }

    public render(parentElement: HTMLElement) {
      if (this.displayName) {
        parentElement.appendChild(document.createTextNode(this.displayName));
      }

      var ul: HTMLUListElement = <HTMLUListElement>document.createElement("UL");

      this.children.forEach((child) => {
        var li: HTMLLIElement = <HTMLLIElement>document.createElement("LI");
        child.render(li);
        ul.appendChild(li);
      });

      parentElement.appendChild(ul);
    }
  }

  window.addEventListener("load", function () {
    var menu: IMenu = new Menu();
    for (var i = 1; i <= 3; i++) {
      menu.children.push(new MenuItemLink("Link " + i, "?id=" + i));
    }

    menu.children.push(new MenuItemImageLink("Contact", "mailto://info@sample.com", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVBgZpcHLThNhGIDh9/vn7/RApwc5VCmFWBPi1mvwAlx7BW69Afeu3bozcSE7E02ILjCRhRrds8AEbKVS2gIdSjvTmf+TYqLu+zyiqszDMCf75PnnnVwhuNcLpwsXk8Q4BYeSOsWpkqrinJI6JXVK6lSRdDq9PO+19vb37XK13Hj0YLMUTVVyWY//Cf8IVwQEGEeJN47S1YdPo4npDpNmnDh5udOh1YsZRcph39EaONpnjs65oxsqvZEyTaHdj3n2psPpKDLBcuOOGUWpZDOG+q0S7751ObuYUisJGQ98T/Ct4Fuo5IX+MGZr95jKjRKLlSxXxFxOEmaaN4us1Upsf+1yGk5ZKhp8C74H5ZwwCGO2drssLZZo1ouIcs2MJikz1oPmapHlaoFXH1oMwphyTghyQj+MefG+RblcoLlaJG/5y4zGCTMikEwTctaxXq/w9kuXdm9Cuzfh9acujXqFwE8xmuBb/hCwl1GKAnGccDwIadQCfD9DZ5Dj494QA2w2qtQW84wmMZ1eyFI1QBVQwV5GiaZOpdsPaSwH5HMZULi9UmB9pYAAouBQbMHHrgQcnQwZV/KgTu1o8PMgipONu2t5KeaNiEkxgAiICDMCCFeEK5aNauAOfoXx8KR9ZOOLk8P7j7er2WBhwWY9sdbDeIJnwBjBWBBAhGsCmiZxPD4/7Z98b/0QVWUehjkZ5vQb/Un5e/DIsVsAAAAASUVORK5CYII="));

    var subMenu: IMenu = new Menu("Sub Menu");
    for (var i = 1; i <= 2; i++) {
      subMenu.children.push(new MenuItemLink("Sub Link " + i, "?id=" + i));
    }

    menu.children.push(subMenu);

    var contentDiv = document.getElementById("output");
    menu.render(contentDiv);
  });
}
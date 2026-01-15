import type { BasePage } from "./base.page";

export class FavoritesPage implements BasePage {

  private root: HTMLElement;

  constructor() {
    this.root = document.createElement("div");
    
    this.init();
    this.initEvents();
  }

  private init(){
    const h1 = document.createElement("h1");
    h1.innerText = "Página Favorites";
    
    this.root.appendChild(h1);
  }

  private initEvents(){

  }

  clear(): void {
    
  }

  render(): HTMLElement {
    return this.root;
  }
  
}
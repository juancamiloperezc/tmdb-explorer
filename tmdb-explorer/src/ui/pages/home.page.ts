import type { BasePage } from "./base.page";

export class HomePage implements BasePage {

  private root: HTMLElement;

  constructor() {
    this.root = document.createElement("div");
    
    this.init();
    this.initEvents();
  }

  private init(){
    const h1 = document.createElement("h1");
    h1.innerText = "Página Principal";
    
    this.root.appendChild(h1);
  }

  private initEvents(){

  }

  render(): Node {
    return this.root;
  }
  
}
import "./dropdown.css";

import { Observable } from "../../../core/observer/observable"

export class DropdownComponent extends Observable<HTMLElement | Node> {
  
  private content: () =>  HTMLElement | Node;
  private label: string;
  private root: HTMLElement;

  constructor(label: string,  content: () => HTMLElement | Node){
    super();
  
    this.root = document.createElement("div");
    this.content = content;
    this.label = label;
    
    this.init();
    this.initEvents();
  }
  
  private init() : void {

    this.root.className = "dropdown";
    this.root.innerText = this.label;

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    dropdownContent.appendChild(this.content());

    this.root.appendChild(dropdownContent);
  }

  private initEvents() : void {
    
    this.root.querySelector(".dropdown-content")?.addEventListener("click", (event: Event) => {
       const element = event.target;
       console.log("presionando", element);
    });

  }

  public render(): HTMLElement {
    return this.root;
  }
}
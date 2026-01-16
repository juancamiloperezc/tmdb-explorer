import "./navbar.css";

import { Observable } from "../../../core/observer/observable"
import { DropdownComponent } from "../dropdown/dropdown.component";

export type NavBarNavigationChild = {
  title: string, 
  path: string
};

export type NavBarNavigationItem = {
  title: string,
  children: NavBarNavigationChild | NavBarNavigationChild[],
};

export class NavBarComponent  {
  
  private navigationItems: NavBarNavigationItem[];
  private actionContent: HTMLElement | Node | null;
  
  private root: HTMLElement;

  constructor(navigationItems: NavBarNavigationItem[], actionContent: HTMLElement | Node){
    
    this.root = document.createElement("nav");
    this.navigationItems = navigationItems;
    this.actionContent = actionContent;
    
    this.init();
    this.initEvents();
  }
  
  private init() : void {

    this.root.className = "navbar";   

    this.root.innerHTML = `
      <img src="../../../../public/typescript.svg" />
      
      <div class="navbar-menu">
        <div class="navbar-navigation"> </div> 
      </div>

      <div class="navbar-actions">
      </div>
    `

    this.root.querySelector(".navbar-navigation")?.appendChild(this.renderNavigationComponents());
    
    if(!this.actionContent) return;
    this.root.querySelector(".navbar-actions")?.appendChild(this.actionContent);
  }

  private renderNavigationComponents() : HTMLElement | Node {
    
    const elementNavigation = (child: NavBarNavigationChild) => {
      const a = document.createElement("a");
      a.innerText = child.title;
      a.href = child.path
      a.className = "nav-bar-navigation-item"
      return a;
    };

    const fragmentActionElements = (children: NavBarNavigationChild[]) : DocumentFragment => {
      const fragment = document.createDocumentFragment();
      const actionElements = children.map(elementNavigation) 
      fragment.append(...actionElements);
      return fragment;
    };
    
    const actionElementsRender = this.navigationItems.map(navItem => {
      if(Array.isArray(navItem.children)){
        const dropdown = new DropdownComponent(navItem.title, () => fragmentActionElements(navItem.children as NavBarNavigationChild[]))
        return dropdown.render();
      }

      const element = elementNavigation(navItem.children);
      return element;
    });

    const fragmentDropDowns = document.createDocumentFragment();
    fragmentDropDowns.append(...actionElementsRender);
    
    return fragmentDropDowns;
  }

  private initEvents() : void {
    
  }

  public render(): HTMLElement {
    return this.root;
  }
}
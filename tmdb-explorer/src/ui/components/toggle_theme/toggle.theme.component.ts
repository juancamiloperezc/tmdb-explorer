import "./toggle-theme.css";

import { Observable } from "../../../core/observer/observable"

export class ToggleThemeComponent extends Observable<boolean> {
  
  private _isDarkTheme!: boolean;

  private root: HTMLElement;

  constructor(isDarkTheme: boolean){
    super();
  
    this.root = document.createElement("div");
    
    this._isDarkTheme = isDarkTheme;
    
    this.init();
    this.initEvents();
  }
  
  private init() : void {

    this.root.className = "toggle-theme"

    this.root.innerHTML = `
      <label for="toggle-theme-check"> 
        <i class="toggle-theme-icon fa-solid ${this._isDarkTheme ? "fa-moon" : "fa-sun"}"> </i>
      </label>
      
      <input id="toggle-theme-check" type="checkbox" ${this._isDarkTheme ? "checked" : "" }>
    `
  }

  private initEvents() : void {
    const toggleThemeCheckbox = this.root.querySelector<HTMLInputElement>("#toggle-theme-check");
    
    if(!toggleThemeCheckbox) return;

    toggleThemeCheckbox.addEventListener("change", (event: Event) => {
      const checkbox = event.target as HTMLInputElement;
      this.isDarkTheme = checkbox.checked;
      this.notify(this._isDarkTheme);
    });
  }

  private changeTheme() : void {
    const currentClass = this._isDarkTheme ? "fa-sun" : "fa-moon";
    const beforeClass = this._isDarkTheme ? "fa-moon" : "fa-sun";
    
    const iconTheme = this.root.querySelector<HTMLElement>(".toggle-theme-icon");
    iconTheme?.classList.replace(currentClass, beforeClass);
  }

  public set isDarkTheme(isDarkTheme: boolean) {
    this._isDarkTheme = isDarkTheme;
    this.changeTheme();
  }

  public get isDarkTheme() {
    return this._isDarkTheme;
  }

  public render(): HTMLElement {
    return this.root;
  }
}
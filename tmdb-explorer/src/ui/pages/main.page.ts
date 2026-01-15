import { ThemeModel } from "../../domain/model/theme.model";
import { ToggleThemeComponent } from "../components/toggle_theme/toggle.theme.component";

import type { IPreferencesRepository } from "../../domain/repositories/preferences.domain.repository";
import type { BasePage } from "./base.page";
import type { NavigationWrapper } from "../navigation/wrapper.navigation";
import type { NavigationRoute } from "../navigation/routes.navigation";

export class MainPage implements BasePage {

  private isDarkTheme: boolean;
  private repository: IPreferencesRepository;
  private navigationWrapper: NavigationWrapper;
  
  private toggleTheme!: ToggleThemeComponent;
  private root: HTMLElement;

  constructor(navigationWrapper: NavigationWrapper, isDarkTheme: boolean, repository: IPreferencesRepository) {
    this.root = document.createElement("div");
    this.isDarkTheme = isDarkTheme;
    this.repository = repository;
    this.navigationWrapper = navigationWrapper;

    this.toggleTheme = new ToggleThemeComponent(this.isDarkTheme);

    this.init();
    this.initEvents();
  }

  private init() {
    this.root.innerHTML = `
      <nav class="navigation">
        <a href="/">Ir A Principal</a>
        <a href="/favorites">Ir A Favoritos</a>
      </nav>
      
      ${this.toggleTheme.render().outerHTML}

      <div id="dynamic-content">
      </div>
    `
  }

  private initEvents() {
    
    this.root.querySelector(".navigation")?.addEventListener("click", (event) => {
      event.preventDefault();  

      const a = (event.target as HTMLElement).closest('a');
      if(!a) return;

      const path = new URL(a.href).pathname;
      const route = this.navigationWrapper.routes.find(itemRoute => itemRoute.path === path);
    
      if(!route) return;

      this.navigationWrapper.navigateTo(route, null);

    });

    this.navigationWrapper.subscribe({
      update: ({ route, params }) => this.changePage(route, params)
    })

    this.toggleTheme.subscribe({
      update: (isDarkTheme: boolean) => this.changeTheme(isDarkTheme)
    });

    this.repository.subscribe({
      update: (theme: ThemeModel) => this.changeTheme(theme === ThemeModel.DARK)
    });
  }

  private changePage(route: NavigationRoute | null, _params: any | null) {
    if (!route) return;
    const page = route.page;

    const dynamicContentSection = document.querySelector<HTMLElement>("#dynamic-content");
    if(!dynamicContentSection) return;
    
    dynamicContentSection.innerHTML = page().render().outerHTML;
  }

  private changeTheme(isDarkTheme: boolean){
     document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }

  clear(): void {
    this.toggleTheme.unsubscribeAll();
    this.repository.unsubscribeAll();
    this.navigationWrapper.unsubscribeAll();
  }

  render(): HTMLElement {
    return this.root;
  }
  
}
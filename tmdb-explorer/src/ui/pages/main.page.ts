import { ThemeModel } from "../../domain/model/theme.model";
import type { IPreferencesRepository } from "../../domain/repositories/preferences.domain.repository";
import { ToggleThemeComponent } from "../components/toggle_theme/toggle.theme.component";

import type { NavigationRoute } from "../navigation/routes.navigation";
import type { BasePage } from "./base.page";

export class MainPage implements BasePage {

  private routes: NavigationRoute[];
  private isDarkTheme: boolean;
  private repository: IPreferencesRepository;
  
  private toggleTheme!: ToggleThemeComponent;
  private root: DocumentFragment;

  constructor(routes: NavigationRoute[], isDarkTheme: boolean, repository: IPreferencesRepository) {
    this.root = document.createDocumentFragment();
    this.routes = routes;
    this.isDarkTheme = isDarkTheme;
    this.repository = repository;

    this.toggleTheme = new ToggleThemeComponent(this.isDarkTheme);

    this.init();
    this.initEvents();
  }

  private init() {
    this.root.append(this.toggleTheme.render());
  }

  private initEvents() {

    this.toggleTheme.subscribe({
      update: (isDarkTheme: boolean) => this.changeTheme(isDarkTheme)
    });

    this.repository.subscribe({
      update: (theme: ThemeModel) => this.changeTheme(theme === ThemeModel.DARK)
    });
  }

  private changeTheme(isDarkTheme: boolean){
     document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }

  render(): Node {
    return this.root;
  }
  
}
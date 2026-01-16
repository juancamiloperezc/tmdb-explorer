import { NavBarComponent, type NavBarNavigationChild, type NavBarNavigationItem } from "../components/navbar/navbar.component";
import { ThemeModel } from "../../domain/model/theme.model";
import { ToggleThemeComponent } from "../components/toggle_theme/toggle.theme.component";

import type { BasePage } from "./base.page";
import type { IPreferencesRepository } from "../../domain/repositories/preferences.domain.repository";
import type { NavigationRoute } from "../navigation/routes.navigation";
import type { NavigationWrapper } from "../navigation/wrapper.navigation";

export class MainPage implements BasePage {

  private isDarkTheme: boolean;
  private repository: IPreferencesRepository;
  private navigationWrapper: NavigationWrapper;
  
  private navBar!: NavBarComponent;
  private toggleTheme!: ToggleThemeComponent;
  private root: Node;

  constructor(navigationWrapper: NavigationWrapper, isDarkTheme: boolean, repository: IPreferencesRepository) {
    this.root = document.createDocumentFragment();
    this.isDarkTheme = isDarkTheme;
    this.repository = repository;
    this.navigationWrapper = navigationWrapper;

    this.toggleTheme = new ToggleThemeComponent(this.isDarkTheme);

    this.init();
    this.initEvents();
    this.changeTheme(isDarkTheme);
  }

  private init() {
    
    const navBarNavItems: NavBarNavigationItem[] = [
      {
        title: "Principal", 
        children: {
           title: "Principal",
           path: "/"
        }
      },
      {
        title: "Peliculas",
        children: [
          {
            title: "Popular",
            path: "/movies?section=popular"
          },
          {
            title: "En Cartelera",
            path: "/movies?section=now"
          },
          {
            title: "Pŕoximo", 
            path: "/movies?section=upcoming"
          },
          {
            title: "Mejores Calificaciones", 
            path: "/movies?section=top"
          }
        ]
      },
      {
        title: "Series",
        children: [
          {
            title: "Popular",
            path:"/series/popular"
          },
          {
            title: "En Transmisión",
            path: "/series/now" 
          },
          {
            title: "En Televisión",
            path: "/series/upcoming" 
          }, 
          {
            title: "Mejores Calificaciones", 
            path: "/series/top" 
          }
        ]
      }, 
      {
        title: "Favoritos",
        children: [
          {
            title: "Peliculas",
            path: "/favorites?section=movies"
          },
          {
            title: "Series",
            path: "/favorites?section=series"
          }
        ]
      }
    ]

    const inputSearch = document.createElement("input");
    inputSearch.type = "text";
    inputSearch.placeholder = "Ingresa Tu Busqueda Aquí";

    const navBarActionSection = document.createDocumentFragment();
    navBarActionSection.appendChild(inputSearch);
    navBarActionSection.appendChild(this.toggleTheme.render());

    const dynamicContent = document.createElement("div");
    dynamicContent.id = "dynamic-content";
    
    const header = document.createElement("header");
    this.navBar = new NavBarComponent(navBarNavItems, navBarActionSection);
    header.append(this.navBar.render());

    this.root.appendChild(header);
    this.root.appendChild(dynamicContent);
  }

  private initEvents() {
    
    this.navigationWrapper.subscribe({
      update: ({ route, params }) => this.changePage(route, params)
    })

    this.toggleTheme.subscribe({
      update: (isDarkTheme: boolean) => {
        this.repository.theme = isDarkTheme? ThemeModel.DARK : ThemeModel.LIGHT
      }
    });

    this.repository.subscribe({
      update: (theme: ThemeModel) => {
        this.changeTheme(theme === ThemeModel.DARK)
      }
    });
  }

  private changePage(route: NavigationRoute | null, _params: any | null) {
    if (!route) return;
    const page = route.page;

    const dynamicContentSection = document.querySelector<HTMLElement>("#dynamic-content");
    if(!dynamicContentSection) return;
    
    dynamicContentSection.innerHTML = "";
    dynamicContentSection.appendChild(page().render());
  }

  private changeTheme(isDarkTheme: boolean){
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }

  clear(): void {
    this.toggleTheme.unsubscribeAll();
    this.repository.unsubscribeAll();
    this.navigationWrapper.unsubscribeAll();
  }

  render(): HTMLElement | Node {
    return this.root;
  }
  
}
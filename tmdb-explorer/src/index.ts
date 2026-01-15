import "./styles/global.css";

import { container} from "./core/di/dependencies";
import { FavoritesPage } from "./ui/pages/favorites.page";
import { HomePage } from "./ui/pages/home.page";
import { MainPage } from "./ui/pages/main.page";
import { PreferencesRepository } from "./data/repositories/preferences.repository";
import { ServiceType } from "./core/di/dependencies";
import { ThemeStorage } from "./data/storage/theme.storage";

import type { NavigationRoute } from "./ui/navigation/routes.navigation";
import type { Singleton } from "./core/di/dependencies";
import type { IPreferencesRepository } from "./domain/repositories/preferences.domain.repository";

const THEME_PREFERENCE = "theme";
const PREFERENCES_REPOSITORY = "preferences-repo";

const themeStorage = new ThemeStorage(THEME_PREFERENCE, "light");
const preferencesRepository = new PreferencesRepository(themeStorage);

const themeProvider: Singleton<ThemeStorage> = {
  type: ServiceType.Singleton,
  instance: themeStorage
};

const preferencesRepositoryProvider: Singleton<PreferencesRepository> = {
  type: ServiceType.Singleton,
  instance: preferencesRepository
}

container.register<ThemeStorage>(THEME_PREFERENCE, themeProvider);
container.register<PreferencesRepository>(PREFERENCES_REPOSITORY, preferencesRepositoryProvider);

window.addEventListener("DOMContentLoaded", () => init());

function init() {

  const routes: Array<NavigationRoute> = [
     {
        title: "Home", 
        description: "Está es la página Home",
        path: "/",
        page: () => new HomePage()
     }, 
     {
        title: "Favorites",
        description: "Esta es la página de favoritos", 
        path: "/favorites",
        page: () => new FavoritesPage()
     }
  ]

  const initialTheme = container.resolve<ThemeStorage>(THEME_PREFERENCE)?.theme === "dark" || false;
  const preferencesRepository = container.resolve<IPreferencesRepository>(PREFERENCES_REPOSITORY);
  
  if(!preferencesRepository) return;

  const app = document.getElementById("app");
  const main = new MainPage(routes, initialTheme, preferencesRepository);
  
  app?.appendChild(main.render());
}
import { container} from "./core/di/dependencies";
import { factoryThemeStorage } from "./data/storage/theme.storage";
import { ServiceType } from "./core/di/dependencies";

import type { Singleton } from "./core/di/dependencies";
import type { ThemeStorage } from "./data/storage/theme.storage";

const THEME_PREFERENCE = "theme";

function loadDependenciesInstances() {
   const themeStorage = factoryThemeStorage(THEME_PREFERENCE, "light");
   
    const themeInstance: Singleton<ThemeStorage> = {
      type: ServiceType.Singleton,
      instance: themeStorage
    };

   container.register<ThemeStorage>(THEME_PREFERENCE, themeInstance); 
}

function onChangeStorage(event: StorageEvent){
   console.log("cambio en local storage la clave", event.key);
}

function onLoad(_event: Event) {
  loadDependenciesInstances();
  
  const themeStorage = container.resolve<ThemeStorage>(THEME_PREFERENCE);
  if(!themeStorage) return;

  const body = document.querySelector<HTMLElement>("body");
  if(!body) return;

  const app = document.getElementById("app");
  if(!app) return;

  const updateThemeDOM = () => {
    toggleTheme.innerText = themeStorage.theme;
    body.style.background = themeStorage.theme === "dark" ? "black" : "white";
  }
  
  const toggleTheme = document.createElement("button");
  updateThemeDOM();

  toggleTheme.addEventListener("click", () => {
      themeStorage.theme = themeStorage.theme === "light" ? "dark" : "light";
      updateThemeDOM();
  });

  app.append(toggleTheme);
}


window.addEventListener("DOMContentLoaded", onLoad);
window.addEventListener("storage", onChangeStorage);


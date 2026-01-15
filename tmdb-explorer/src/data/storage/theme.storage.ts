export type ThemeString = "light" | "dark";

export class ThemeStorage {

  private defaultTheme: ThemeString;
  private item!: string;

  constructor(item: string, defaultTheme: ThemeString){
    this.item = item; 
    this.defaultTheme = defaultTheme;
  }

  public get theme() : ThemeString {
    const theme = localStorage.getItem(this.item);
    const targetTheme = (theme === "light" || theme === "dark") ? theme : this.defaultTheme; 
    
    localStorage.setItem(this.item, targetTheme);
    return targetTheme;
  }
  
  public set theme(themeKey: ThemeString) {
    localStorage.setItem(this.item, themeKey);
  }
}

// export const factoryThemeStorage = (item: string, defaultTheme: ThemeString) => new ThemeStorage(item, defaultTheme);
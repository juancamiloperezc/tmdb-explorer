import { ThemeModel } from "../../domain/model/theme.model";

import type { ThemeString } from "../storage/theme.storage";

export function themeStringToThemeModel(theme: ThemeString) : ThemeModel | null {
    if(theme === "light") return ThemeModel.LIGHT;
    if(theme === "dark") return ThemeModel.DARK;
    return null;
}

export function themeModelToThemeString(theme: ThemeModel) : ThemeString | null {
    if(theme === ThemeModel.LIGHT) return "light";
    if(theme === ThemeModel.DARK) return "dark";
    return null;
}
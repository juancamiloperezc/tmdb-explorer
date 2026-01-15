import type { Observable } from "../../core/observer/observable";
import type { ThemeModel } from "../model/theme.model";

export interface IPreferencesRepository <T> extends Observable<T> {
  set theme(themeModel);
  get theme(): ThemeModel;
}
import type { Observable } from "../../core/observer/observable";
import type { ThemeModel } from "../model/theme.model";

export interface IPreferencesRepository extends Observable<ThemeModel> {
  set theme(themeModel);
  get theme(): ThemeModel;
}
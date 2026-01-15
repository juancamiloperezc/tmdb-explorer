import { themeModelToThemeString, themeStringToThemeModel } from "../mapper/theme.mapper";
import { Observable } from "../../core/observer/observable";

import type { ThemeModel } from "../../domain/model/theme.model";
import type { ThemeStorage } from "../storage/theme.storage";
import type { IPreferencesRepository } from "../../domain/repositories/preferences.domain.repository";

export class PreferencesRepository extends Observable<ThemeModel> implements IPreferencesRepository {

    private themeStorage!: ThemeStorage;

    constructor(themeStorage: ThemeStorage) {
      super();
      this.themeStorage = themeStorage;
    }

    public set theme(themeModel: ThemeModel) {
        const targetThemeModel = themeModelToThemeString(themeModel);
        if(!targetThemeModel) throw Error("themeModel no valido");
        
        this.notify(themeModel);
        this.themeStorage.theme = targetThemeModel;
    }

    public get theme() : ThemeModel {
        const targetThemeString = themeStringToThemeModel(this.themeStorage.theme);
        if (targetThemeString === undefined || targetThemeString === null) throw Error("themestring no valido");
        return targetThemeString;
    }

}

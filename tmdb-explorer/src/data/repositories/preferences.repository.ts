import { themeModelToThemeString, themeStringToThemeModel } from "../mapper/theme.mapper";

import type { ThemeModel } from "../../domain/model/theme.model";
import type { ThemeStorage } from "../storage/theme.storage";
import type { IPreferencesRepository } from "../../domain/repositories/preferences.domain.repository";
import { Observable } from "../../core/observer/observable";

class PreferencesRepository<T> extends Observable<T> implements IPreferencesRepository<T> {

    private themeStorage!: ThemeStorage;

    constructor(themeStorage: ThemeStorage) {
      super();
      this.themeStorage = themeStorage;
    }

    public set theme(themeModel: ThemeModel) {
        const targetThemeModel = themeModelToThemeString(themeModel);
        if(!targetThemeModel) throw Error("themeModel no valido");
        this.themeStorage.theme = targetThemeModel;
    }

    public get theme() : ThemeModel {
        const targetThemeString = themeStringToThemeModel(this.themeStorage.theme);
        if (!targetThemeString) throw Error("themestring no valido");
        return targetThemeString;
    }

}

export type { PreferencesRepository };

export const preferencesRepositoryFactory = (themeStorage: ThemeStorage) => new PreferencesRepository(themeStorage);


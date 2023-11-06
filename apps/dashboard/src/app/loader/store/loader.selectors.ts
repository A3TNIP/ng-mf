import {AppStateInterface} from "../state/app.state.interface";
import {createSelector} from "@ngrx/store";

export const loaderSelectorFeature = (state: AppStateInterface) => state.loader;

export const loaderSelector = createSelector(loaderSelectorFeature, (state) => state);

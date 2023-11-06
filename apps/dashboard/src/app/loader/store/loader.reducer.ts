import {Action, createReducer, on} from '@ngrx/store';
import {hideLoader, setLoader} from "@ng-mf/data-access-user";

export const LOADER_FEATURE_KEY = 'loader';

export interface LoaderState {
  isLoading: boolean;
  message: string;
}

export const initialLoaderState: LoaderState = {
  isLoading: false,
  message: '',
};

const reducer = createReducer(
  initialLoaderState,
  on(setLoader, (state, action) => ({
    ...state,
    isLoading: true,
    message: action.message,
  })),
  on(hideLoader, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export function loaderReducer(state: LoaderState | undefined, action: Action) {
  return reducer(state, action);
}

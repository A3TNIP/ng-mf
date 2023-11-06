import {createAction, emptyProps, props} from '@ngrx/store';


export const setLoader = createAction(
  '[Loader/API] Load Loader Success',
  props<{ message: string }>()
);

export const hideLoader = createAction(
  '[Loader/API] Load Loader Failure',
  emptyProps
);

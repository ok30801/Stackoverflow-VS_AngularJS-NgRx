import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StackOverflowDataReducer } from './stackOverflowData';

export interface State {
  data: any
}

export const reducers: ActionReducerMap<State> = {
  data: StackOverflowDataReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

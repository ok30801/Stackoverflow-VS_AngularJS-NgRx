import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StackOverflowDataReducer, StackOverflowDataState } from './reducers/reducer';

export interface State {
  data: StackOverflowDataState
}

export const reducers: ActionReducerMap<State> = {
  data: StackOverflowDataReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

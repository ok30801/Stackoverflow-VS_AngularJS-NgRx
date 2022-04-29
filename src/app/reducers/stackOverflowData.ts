import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

export const addStackOverflowData = createAction(
  '[STACKOVERFLOW_DATA] addStackOverflowData', props<{ payload: any }>()
)

export interface StackOverflowDataState {
  searchData: any
}

export const initialState: any = []

export const StackOverflowDataReducer = createReducer(
  initialState,
  on(addStackOverflowData, (state, {payload}) => ({
    ...state,
    searchData: payload
  }))
)

export const featureSelector = createFeatureSelector<StackOverflowDataState>('data')

export const StackOverflowDataSelector = createSelector(
  featureSelector,
  state => {
    return state.searchData
  }
)


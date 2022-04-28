import { createAction, createReducer, on, props } from '@ngrx/store';

export const addStackOverflowData = createAction(
  '[STACKOVERFLOW_DATA] addStackOverflowData', props<{payload: any}>()
)

export interface StackOverflowDataState {
  data: any
}

export const initialState: any = []

export const StackOverflowDataReducer = createReducer(
  initialState,
  on(addStackOverflowData, (state, { payload }) => {
    return [...payload]
  })
)


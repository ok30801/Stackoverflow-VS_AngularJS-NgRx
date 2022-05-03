import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

export const addStackOverflowData = createAction(
  '[STACKOVERFLOW_DATA] addStackOverflowData', props<{ payload: any }>()
)

export const addAuthorData = createAction(
  '[AUTHOR_DATA] addAuthorData', props<{ payload: any }>()
)

export const addTagData = createAction(
  '[TAG_DATA] addTagData', props<{ tagData: any, tagName: string }>()
)
export const clearData = createAction(
  '[CLEAR_DATA] clearData'
)

export interface StackOverflowDataState {
  searchData: any
  authorData: any
  tagData: any
  tagName: string
}

export const initialState: any = []

export const StackOverflowDataReducer = createReducer(
  initialState,
  on(addStackOverflowData, (state, {payload}) => ({
    ...state,
    searchData: payload
  })),
  on(addAuthorData, (state, {payload}) => ({
    ...state,
    authorData: payload,
  })),
  on(addTagData, (state, {tagData, tagName}) => ({
    ...state,
    tagData: tagData,
    tagName: tagName
  })),
  on(clearData, state => ({
    ...state,
    authorData: [],
    tagData: [],
    tagName: ''
  }))
)

export const featureSelector = createFeatureSelector<StackOverflowDataState>('data')

export const StackOverflowDataSelector = createSelector(
  featureSelector,
  state => {
    console.log('state', state)
    return state.searchData
  }
)
export const AuthorDataSelector = createSelector(
  featureSelector,
  state => {
    console.log('state', state)
    return state.authorData
  }
)
export const TagDataSelector = createSelector(
  featureSelector,
  state => {
    console.log('state=>tag', state)
    return state.tagData
  }
)
export const TagNameSelector = createSelector(
  featureSelector,
  state => {
    console.log('state=>tag', state)
    return state.tagName
  }
)



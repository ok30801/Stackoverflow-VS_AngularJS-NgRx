import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StackOverflowDataState } from '../reducers/reducer';

export const featureSelector = createFeatureSelector<StackOverflowDataState>('data')

export const StackOverflowDataSelector = createSelector(
  featureSelector,
  state => {
    return state.searchData
  }
)
export const AuthorDataSelector = createSelector(
  featureSelector,
  state => {
    return state.authorData
  }
)
export const TagDataSelector = createSelector(
  featureSelector,
  state => {
    return state.tagData
  }
)
export const TagNameSelector = createSelector(
  featureSelector,
  state => {
    return state.tagName
  }
)
export const QuestionDataSelector = createSelector(
  featureSelector,
  state => {
    return state.questionData
  }
)
// export const SearchQuerySelector = createSelector(
//   featureSelector,
//   state => {
//     return state.searchQuery
//   }
// )

export const AnswerDataSelector = createSelector(
  featureSelector,
  state => {
    return state.answerData
  }
)

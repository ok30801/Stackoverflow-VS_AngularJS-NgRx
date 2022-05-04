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

export const addAnswerData = createAction(
      '[ANSWER_DATA] addAnswerData', props<{ answerData: any }>()
)

export const addQuestionData = createAction(
  '[QUESTION_DATA] addQuestionData', props<{ questionData: any }>()
)
export const clearData = createAction(
  '[CLEAR_DATA] clearData'
)

export interface StackOverflowDataState {
  searchData: any
  authorData: any
  tagData: any
  tagName: string
  questionData: any
  answerData: any
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
  on(addQuestionData, (state, {questionData}) => ({
    ...state,
    questionData: questionData,
  })),
  on(addAnswerData, (state, {answerData}) => ({
    ...state,
    answerData: answerData,
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

export const AnswerDataSelector = createSelector(
  featureSelector,
  state => {
    return state.answerData
  }
)


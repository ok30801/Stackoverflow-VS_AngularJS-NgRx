import { addStackOverflowData, addAuthorData, addTagData, addQuestionData, addAnswerData, clearData } from '../actions/actions'
import { createReducer, on } from "@ngrx/store";

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

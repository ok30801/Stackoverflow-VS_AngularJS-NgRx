import { createAction, props } from '@ngrx/store';

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

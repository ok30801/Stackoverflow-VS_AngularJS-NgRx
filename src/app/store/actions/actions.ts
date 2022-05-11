import { createAction, props } from '@ngrx/store';

export const apiData = createAction(
  '[API_DATA] apiData', props<{ payload: any }>()
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
export const isSuccessSearch = createAction(
  '[IS_SUCCESS_SEARCH] isSuccessSearch', props<{ payload: boolean }>()
)
export const addSearchQuery = createAction(
  '[SEARCH_QUERY] addSearchQuery', props<{ payload: any }>()
)
export const clearDataDialogAuthor = createAction(
  '[CLEAR_DATA_DIALOG_AUTHOR] clearDataDialogAuthor'
)
export const clearDataDialogTag = createAction(
  '[CLEAR_DATA_DIALOG_TAG] clearDataDialogTAG'
)

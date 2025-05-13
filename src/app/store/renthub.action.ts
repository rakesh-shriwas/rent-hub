import { createAction, props } from "@ngrx/store";
import { IComments, IRentPost } from "../models/common.vm";


/** Rent Post Action */
export const loadRentPost = createAction('[Posts] Load Rent Posts');
export const loadRentPostSuccess = createAction('[Posts] Load Rent Posts Success', props<{posts: IRentPost[]}>());

/** Post Comments */
export const loadCommentsByPostId = createAction('[Comments] Load Post Comments', props<{postId: number}>());
export const loadCommentsByPostIdSuccess = createAction('[Comments] Load Post Comments Success', props<{comments: IComments[]}>());
export const loadCommentsByPostIdFailure = createAction('[Comments] Load Post Comments Failure', props<{error: string}>());
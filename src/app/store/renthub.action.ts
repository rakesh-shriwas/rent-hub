import { createAction, props } from "@ngrx/store";
import { IComments, ICreatePost, IRentPost, IUser } from "../models/common.vm";


/** Rent Post Action */
export const loadRentPost = createAction('[Posts] Load Rent Posts');
export const loadRentPostSuccess = createAction('[Posts] Load Rent Posts Success', props<{posts: IRentPost[]}>());

/** Create Post */
export const createPost = createAction('[Post] Create New Post', props<{payload: any}>());
export const createPostSuccess = createAction('[Post] Create New Post Success', props<{post: IRentPost}>());
export const createPostFailure = createAction('[Post] Create New Post Failure', props<{error: string}>());
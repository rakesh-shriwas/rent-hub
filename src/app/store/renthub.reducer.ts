import { createReducer, on } from '@ngrx/store';
import { IComments, IRentPost } from '../models/common.vm';
import {
  loadCommentsByPostId,
  loadCommentsByPostIdFailure,
  loadCommentsByPostIdSuccess,
  loadRentPost,
  loadRentPostSuccess,
} from './renthub.action';

/** State interface of Rent Post */
export interface RentHubState {
  posts: IRentPost[];
  isLoading: boolean;
  comments: IComments[];
  error: string | null;
}

/** Initial State with default value of Rent Post */
export const initialState: RentHubState = {
  posts: [],
  isLoading: false,
  comments: [],
  error: null,
};

/** Rent Post Reducer Creation */
export const rentPostReducer = createReducer(
  initialState,
  on(loadRentPost, (state) => ({
    // Existing state
    ...state,
    isLoading: true,
  })),
  on(loadRentPostSuccess, (state, { posts }) => ({
    ...state,
    posts,
    isLoading: false,
  })),
  on(loadCommentsByPostId, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadCommentsByPostIdSuccess, (state, { comments }) => ({
    ...state,
    comments,
    isLoading: false,
  })),
  on(loadCommentsByPostIdFailure, (state, { error }) => ({
    ...state,
    comments: [],
    isLoading: false,
    error,
  }))
);

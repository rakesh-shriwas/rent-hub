import { createReducer, on } from '@ngrx/store';
import { IComments, IRentPost } from '../models/common.vm';
import {
  createPost,
  createPostFailure,
  createPostSuccess,
  loadRentPost,
  loadRentPostSuccess,
} from './renthub.action';

/** State interface of Rent Post */
export interface RentHubState {
  posts: IRentPost[];
  isLoading: boolean;
  comments: IComments[];
  error: string | null;
  createPostSuccess: boolean;
}

/** Initial State with default value of Rent Post */
export const initialState: RentHubState = {
  posts: [],
  isLoading: false,
  comments: [],
  error: null,
  createPostSuccess: false
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
  on(createPost, (state) => ({
    ...state,
    isLoading: true,
    createPostSuccess: false
  })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    isLoading: false,
    createPostSuccess: true
  })),
  on(createPostFailure, (state, { error }) => ({
    ...state,
    posts: [],
    isLoading: false,
    error,
  }))
);

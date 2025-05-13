import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { IComments, IRentPost } from '../../models/common.vm';

interface PostDetailsInitialState {
  postDetails: IRentPost[];
  isLoading: boolean;
  postComments: IComments[];
  postCommentSuccessfully: boolean;
  commentIsLoading: boolean;
}

@Injectable()
export class PostDetailsComponentStore extends ComponentStore<PostDetailsInitialState> {
  private service = inject(CommonService);

  constructor() {
    super({
      postDetails: [],
      isLoading: false,
      postComments: [],
      postCommentSuccessfully: false,
      commentIsLoading: false
    });
  }

  readonly selectPostDetails$: Observable<IRentPost[]> = this.select(
    (state) => state.postDetails
  );
  readonly selectIsLoading$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );
  readonly selectPostComments$: Observable<IComments[]> = this.select(
    (state) => state.postComments
  );

  readonly selectPostCommentSuccessfully$: Observable<boolean> = this.select((state) => state.postCommentSuccessfully);

  readonly loadPostDetailsById = this.effect(
    (data: Observable<{ postId: number }>) =>
      data.pipe(
        switchMap((req: { postId: number }) => {
          this.setState((state) => ({
            ...state,
            isLoading: true,
          }));

          return this.service.getPostDetailsById(req.postId).pipe(
            tap({
              next: (res) => {
                this.setState((state) => ({
                  ...state,
                  isLoading: false,
                  postDetails: res,
                }));
              },
              error: () => {
                this.setState((state) => ({
                  ...state,
                  isLoading: false,
                  postDetails: [],
                }));
              },
            })
          );
        })
      )
  );

  readonly loadPostCommentsById = this.effect(
    (data: Observable<{ postId: number }>) =>
      data.pipe(
        switchMap((req: { postId: number }) => {
          this.setState((state) => ({
            ...state,
            commentIsLoading: true,
          }));
          return this.service.getCommentsByPostId(req.postId).pipe(
            tap({
              next: (comments) => {
                this.setState((state) => ({
                  ...state,
                  postComments: comments,
                  commentIsLoading: false,
                }));
              },
              error: () => {
                this.setState((state) => ({
                  ...state,
                  postComments: [],
                  commentIsLoading: false,
                }));
              },
            })
          );
        })
      )
  );

  readonly commentOnPost = this.effect((data: Observable<IComments>) =>
    data.pipe(
      switchMap((req: IComments) => {
        this.setState((state) => ({
          ...state,
          commentSuccessfully: false
        }));
        return this.service.postAComment(req).pipe(
          tap({
            next: (comments: IComments[]) => {
              this.setState((state) => ({
                ...state,
                commentSuccessfully: true,
              }));
            },
            error: () => {
              this.setState((state) => ({
                ...state,
                commentSuccessfully: false,
              }));
            },
          })
        );
      })
    )
  );
}

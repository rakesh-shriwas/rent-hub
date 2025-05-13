import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommonService } from '../services/common.service';
import {

  loadCommentsByPostId,
  loadCommentsByPostIdSuccess,
  loadRentPost,
  loadRentPostSuccess,
} from './renthub.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { IRentPost } from '../models/common.vm';

@Injectable()
export class RentPostEffects {
  actions$ = inject(Actions);
  service = inject(CommonService);
  constructor() {}

  /**
   * Load all rent post
   *
   * @memberof RentPostEffects
   */
  loadRentPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRentPost),
      mergeMap(() =>
        this.service
          .getRentPosts()
          .pipe(map((posts: IRentPost[]) => {
            console.log('posts', posts)
            return loadRentPostSuccess({ posts })
          }))
      )
    )
  );

  loadCommentsByPostId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCommentsByPostId),
      switchMap(({ postId }) =>
        this.service.getCommentsByPostId(postId).pipe(
          map((comments) => loadCommentsByPostIdSuccess({ comments })),
          catchError((error) =>
            of(loadCommentsByPostIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
function loadCommentsByPostIdFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}


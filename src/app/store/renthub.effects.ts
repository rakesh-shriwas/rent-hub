import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommonService } from '../services/common.service';
import {
  createPost,
  createPostFailure,
  createPostSuccess,
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
        this.service.getRentPosts().pipe(
          map((posts: IRentPost[]) => {
            return loadRentPostSuccess({ posts });
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      switchMap(({payload}) =>
        this.service.createRentPost(payload).pipe(
          map((post) => createPostSuccess({post})),
          catchError((error) => of(createPostFailure({ error: error.message })))
        )
      )
    )
  );
}

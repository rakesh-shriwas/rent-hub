import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAmenities, IComments, IRentPost } from '../../models/common.vm';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PostDetailsComponentStore } from './details.store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  imports: [
    CommentsListComponent,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  providers: [PostDetailsComponentStore],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  readonly activatedRoute = inject(ActivatedRoute);
  readonly componentStore = inject(PostDetailsComponentStore);
  private location = inject(Location);
  currentPostId: number;

  /** Store Post Details Inprogress state */
  readonly isLoading$: Observable<boolean> =
    this.componentStore.selectIsLoading$;
  /** Store Post Details*/
  readonly postDetails$: Observable<IRentPost[]> =
    this.componentStore.selectPostDetails$;
  /** Store Post Comments */
  readonly postComments$: Observable<IComments[]> =
    this.componentStore.selectPostComments$;
  /** Store Comment Successfully */
  readonly postCommentSuccessfully$: Observable<boolean> =
    this.componentStore.selectPostCommentSuccessfully$;
  /** Store Comment loading state */
  readonly commentIsLoading$: Observable<boolean> = this.componentStore.selectCommentIsLoading$;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.currentPostId = params?.['id'];
        this.componentStore.loadPostDetailsById({ postId: this.currentPostId });
        this.componentStore.loadPostCommentsById({
          postId: this.currentPostId,
        });
      });

    this.postCommentSuccessfully$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.componentStore.loadPostCommentsById({
            postId: this.currentPostId,
          });
        }
      });
  }

  // amenities: IAmenities[] = [
  //   { name: 'Gym/Fitness Center', icon: 'check_circle' },
  //   { name: 'Swimming Pool', icon: 'check_circle' },
  //   { name: 'Card Park', icon: 'check_circle' },
  //   { name: 'Visitors Parking', icon: 'check_circle' },
  //   { name: 'Power Backup', icon: 'check_circle' },
  //   { name: 'Garbage Disposal', icon: 'check_circle' },
  //   { name: 'Private Lawn', icon: 'check_circle' },
  //   { name: 'Water Heater', icon: 'check_circle' },
  //   { name: 'Plant Security System', icon: 'check_circle' },
  //   { name: 'Laundry Service', icon: 'check_circle' },
  //   { name: 'Elevator', icon: 'check_circle' },
  //   { name: 'Club House', icon: 'check_circle' },
  // ];

  goBack(): void {
    this.location.back();
  }

  postComment(comment: string): void {
    const obj: IComments = {
      createdAt: new Date().toISOString(),
      postId: 101,
      userId: 5,
      userName: 'Jane Doe',
      comment,
    };
    this.componentStore.commentOnPost(obj);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

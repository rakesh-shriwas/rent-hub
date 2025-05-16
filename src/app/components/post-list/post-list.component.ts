import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectPosts } from '../../store/renthub.selectors';
import { IRentPost, IUser } from '../../models/common.vm';
import { loadRentPost } from '../../store/renthub.action';
import { CardComponent } from '../card/card.component';
import { NotRecordFoundComponent } from '../not-record-found/not-record-found.component';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-post-list',
  imports: [CardComponent, NotRecordFoundComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private store = inject(Store);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  private service = inject(CommonService);
  private destroy$ = new Subject<void>();

  loggedInUser = signal<any>(null);
  myPostList = signal<IRentPost[]>([]);
  loggedInUserDetails: IUser;
  userId: number = 2;

  /** Store Post Data */
  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);

  ngOnInit(): void {
    this.store.dispatch(loadRentPost());
    this.posts$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res?.length) {
        const filterData = res.filter((post) => post.userId === this.userId);
        this.myPostList.set(filterData);
        this.loggedInUserDetails = this.service.getAuthenticateUser();
        this.loggedInUser.set(this.loggedInUserDetails);
      }
    });
  }

  viewDetails(postId: number): void {
    this.router.navigate(['/home', 'my', 'post', postId]);
  }

  editPost(post: IRentPost): void {
    this.dialog.open(CreatePostDialogComponent, {
      maxWidth: '950px',
      autoFocus: false,
      data: post,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

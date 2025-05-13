import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectPosts } from '../../store/renthub.selectors';
import { IRentPost } from '../../models/common.vm';
import { loadRentPost } from '../../store/renthub.action';
import { CardComponent } from '../card/card.component';
import { AsyncPipe } from '@angular/common';
import { NotRecordFoundComponent } from '../not-record-found/not-record-found.component';

@Component({
  selector: 'app-post-list',
  imports: [CardComponent, NotRecordFoundComponent, AsyncPipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  router = inject(Router);
  myPostList = signal<IRentPost[]>([]);

  userId: number = 2;

  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);

  ngOnInit(): void {
    this.store.dispatch(loadRentPost());
    this.posts$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if(res?.length){
        const filterData = res.filter((post) => post.userId === this.userId);
        console.log('filterData',res)
        this.myPostList.set(filterData);
      }
    })
  }

  viewDetails(postId: number): void {
    this.router.navigate(['/home', 'my', 'post', postId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

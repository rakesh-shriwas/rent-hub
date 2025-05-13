import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FavoritesComponentStore } from './fav-list.store';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { IFavorites, IRentPost } from '../../models/common.vm';
import { CardComponent } from '../card/card.component';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../store/renthub.selectors';
import { loadRentPost } from '../../store/renthub.action';
import { NotRecordFoundComponent } from '../not-record-found/not-record-found.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-list',
  imports: [NotRecordFoundComponent, CardComponent],
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.scss',
  providers: [FavoritesComponentStore],
})
export class FavListComponent implements OnInit, OnDestroy {
  private componentStore = inject(FavoritesComponentStore);
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  router = inject(Router);

  favoritesPostList = signal<IRentPost[]>([]);

  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);

  favorites$: Observable<IFavorites[]> = this.componentStore.selectFavorites$;
  isLoading$: Observable<boolean> = this.componentStore.selectIsLoading$;

  ngOnInit(): void {
    this.store.dispatch(loadRentPost());
    this.componentStore.loadFavorites({ userId: 1 });
    combineLatest([this.favorites$, this.posts$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([favorites, posts]) => {
        if (favorites?.length && posts?.length) {
          // Step 1: Extract favorite post IDs
          const favoritePostIds = new Set(favorites.map(f => f.postId));
          // Step 2: Filter posts based on those favorite IDs
          const filterData = posts.filter((post) => favoritePostIds.has(post.id))
          // Step 3: Add isFavorite key to each filtered item
          const favoritePostData = filterData.map(data => ({
            ...data,
            isFavorite: favoritePostIds.has(data.id)
          }))
          this.favoritesPostList.set(favoritePostData);
        }
      });
  }

  viewDetails(event: Event): void {
    this.router.navigate([event]);
  }

  onFavoriteChange(postId: number): void {
    console.log('Fav::', event)
    // this.componentStore.favoriteChange({postId, userId: 1})
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { CommonService } from '../../services/common.service';
import { IComments, IRentPost } from '../../models/common.vm';
import { Store } from '@ngrx/store';
import { loadCommentsByPostId, loadRentPost } from '../../store/renthub.action';
import { Observable } from 'rxjs';
import { isLoadingSelector, selectComments, selectPosts } from '../../store/renthub.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  private store = inject(Store);

  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);
  isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);
  /* Comments */
  comments$: Observable<IComments[]> = this.store.select(selectComments);

  ngOnInit(): void {
   this.store.dispatch(loadRentPost());
   this.store.dispatch(loadCommentsByPostId({postId: 101}));
  }
  createPostPorm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1400),
    ]),
  });

  viewDetails(event: Event): void {
    this.router.navigate(['/home', 'post', event]);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RentCardComponent } from '../rent-card/rent-card.component';
import { CommonService } from '../../services/common.service';
import { IComments, IRentPost } from '../../models/common.vm';
import { Store } from '@ngrx/store';
import { loadCommentsByPostId, loadRentPost } from '../../store/renthub.action';
import { Observable } from 'rxjs';
import { isLoadingSelector, selectComments, selectPosts } from '../../store/renthub.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RentCardComponent, AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly service = inject(CommonService);

  private store = inject(Store);

  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);
  isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);
  /* Comments */
  comments$: Observable<IComments[]> = this.store.select(selectComments);

  ngOnInit(): void {
    // this.service.getRentPost().subscribe({
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
    console.log(event);
    this.router.navigate(['/home', 'post', event]);
  }
}

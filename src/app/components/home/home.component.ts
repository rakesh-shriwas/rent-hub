import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { IComments, IRentPost } from '../../models/common.vm';
import { Store } from '@ngrx/store';
import { loadRentPost } from '../../store/renthub.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  selectCreatePostSuccess,
  selectIsLoading,
  selectPosts,
} from '../../store/renthub.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  private destroy$ = new Subject<void>();

  private store = inject(Store);

  posts$: Observable<IRentPost[]> = this.store.select(selectPosts);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);


  ngOnInit(): void {
    this.store.dispatch(loadRentPost());
  }
  createPostForm = new FormGroup({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

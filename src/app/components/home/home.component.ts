import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RentCardComponent } from '../rent-card/rent-card.component';
import { CommonService } from '../../services/common.service';
import { IRentPost } from '../../models/common.vm';

@Component({
  selector: 'app-home',
  imports: [RentCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly service = inject(CommonService);
  
  ngOnInit(): void {
    // this.service.getRentPost().subscribe({
    //   next: (res: IRentPost[]) => {
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.log(err);
    //       alert('Wrong Credentials'); // Handle any error
    //   },
    //   complete: () => {
    //     console.log('Observable completed'); // Handle completion
    //   },
    // })
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

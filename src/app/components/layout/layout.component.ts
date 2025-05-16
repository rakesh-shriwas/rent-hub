import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginSignupDialogComponent } from '../login-signup-dialog/login-signup-dialog.component';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import { CommonService } from '../../services/common.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  service = inject(CommonService);
  loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  ngOnInit(): void {
    const authenticateUser = this.service.getAuthenticateUser();
    this.loggedInUser$.next(authenticateUser);
  }
  openLoginSignup(dialogType: string): void {
    const dialogRef = this.dialog.open(LoginSignupDialogComponent, {
      data: dialogType,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loggedInUser$.next(result);
      this.router.navigate(['/home'])
    });
  }

  createNewPost() {
    this.dialog.open(CreatePostDialogComponent, {
      maxWidth: '950px',
      autoFocus: false,
    });
  }

  logOut(){
    localStorage.removeItem('loggedInUser');
    this.loggedInUser$.next(null);
    this.router.navigate(['/main']).then(() => {
      window.location.reload();
    });
  }
}

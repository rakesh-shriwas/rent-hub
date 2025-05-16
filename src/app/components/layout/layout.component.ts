import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginSignupDialogComponent } from '../login-signup-dialog/login-signup-dialog.component';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  
  ngOnInit(): void {
    this.createNewPost();
  }
  openLoginSignup(dialogType: string): void {
    this.dialog.open(LoginSignupDialogComponent, {
      data: dialogType,
    });
  }

  createNewPost() {
    // const dialogRef = this.dialog.open(CreatePostDialogComponent, {
    //   maxWidth: '950px',
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
    this.dialog.open(CreatePostDialogComponent, {
      maxWidth: '950px',
      autoFocus: false
    });
  }
}

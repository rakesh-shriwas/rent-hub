import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginSignupDialogComponent } from '../login-signup-dialog/login-signup-dialog.component';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  readonly dialog = inject(MatDialog);

  openLoginSignup(dialogType: string): void {
    this.dialog.open(LoginSignupDialogComponent, {
      data: dialogType,
    });
  }

  createNewPost() {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      maxWidth: '950px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginSignupDialogComponent } from '../../components/login-signup-dialog/login-signup-dialog.component';

@Component({
  selector: 'app-landing-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  readonly dialog = inject(MatDialog);

  openLoginSignup(dialogType: string): void {
    this.dialog.open(LoginSignupDialogComponent, {
      data: dialogType,
    });
  }
}

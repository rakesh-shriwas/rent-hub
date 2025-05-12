import { Component } from '@angular/core';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAmenities } from '../../models/common.vm';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-details',
  imports: [
    CommentsListComponent,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent {
  amenities: IAmenities[] = [
    { name: 'Gym/Fitness Center', icon: 'check_circle' },
    { name: 'Swimming Pool', icon: 'check_circle' },
    { name: 'Card Park', icon: 'check_circle' },
    { name: 'Visitors Parking', icon: 'check_circle' },
    { name: 'Power Backup', icon: 'check_circle' },
    { name: 'Garbage Disposal', icon: 'check_circle' },
    { name: 'Private Lawn', icon: 'check_circle' },
    { name: 'Water Heater', icon: 'check_circle' },
    { name: 'Plant Security System', icon: 'check_circle' },
    { name: 'Laundry Service', icon: 'check_circle' },
    { name: 'Elevator', icon: 'check_circle' },
    { name: 'Club House', icon: 'check_circle' },
  ];
}

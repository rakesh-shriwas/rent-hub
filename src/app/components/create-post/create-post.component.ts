import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-post',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  amenities: string[] = [
    'Gym/Fitness Center',
    'Swimming Pool',
    'Card Park',
    'Visitors Parking',
    'Power Backup',
    'Garbage Disposal',
    'Private Lawn',
    'Water Heater',
    'Plant Security System',
    'Laundry Service',
    'Elevator',
    'Club House'

  ] 
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

@Component({
  selector: 'app-comments',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss',
})
export class CommentsListComponent {

  comments: Comment[] = [
    {
      id: 1,
      author: 'Rakesh Shriwas',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      date: '20 April'
    },
    {
      id: 2,
      author: 'Ramesh Shriwas',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      date: '20 April'
    },
    {
      id: 3,
      author: 'Aman Shriwas',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      date: '20 April'
    },
    {
      id: 4,
      author: 'Rahul Kumar',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      date: '20 April'
    },
    {
      id: 5,
      author: 'Avisha',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      date: '20 April'
    }
  ]
}

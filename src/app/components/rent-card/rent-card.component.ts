import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IRentPost } from '../../models/common.vm';

@Component({
  selector: 'app-rent-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './rent-card.component.html',
  styleUrl: './rent-card.component.scss',
})
export class RentCardComponent {
  @Output() viewPostDetails = new EventEmitter();
  @Input() post: IRentPost;
  constructor() {}
}

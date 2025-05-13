import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IRentPost } from '../../models/common.vm';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Output() viewPostDetails = new EventEmitter();
  @Output() toggleFavorite = new EventEmitter();
  @Input() post: IRentPost;
  @Input() showFavoriteButton: boolean = true;

  constructor() {}
}

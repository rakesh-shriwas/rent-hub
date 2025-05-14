import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IComments } from '../../models/common.vm';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss',
})
export class CommentsListComponent {
  commentFormControl = new FormControl('', [Validators.minLength(6), this.noWhitespaceValidator]);

  @Input() comments: IComments[] = [];
  @Input() isLoading: boolean = false;
  @Output() postComment = new EventEmitter<string>();

  postAComment(): void {
    if (this.commentFormControl.valid) {
      this.postComment.emit(this.commentFormControl.value?.trim());
      this.commentFormControl.reset();
    }
  }

  // Custom validator: disallow only-whitespace input
  noWhitespaceValidator(control: AbstractControl) {
    const isValid = (control.value || '').trim().length > 0;
    return isValid ? null : { whitespace: true };
  }
}

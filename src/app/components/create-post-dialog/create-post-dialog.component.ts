import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { createPost, loadRentPost } from '../../store/renthub.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCreatePostSuccess } from '../../store/renthub.selectors';
import { MatIconModule } from '@angular/material/icon';

interface ICreatePostForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  apartmentType: FormControl<string | null>;
  name: FormControl<string | null>;
  sharedProperty: FormControl<boolean | null>;
  location: FormControl<string | null>;
  squareFit: FormControl<string | null>;
  stayType: FormControl<string | null>;
  rent: FormControl<string | null>;
  priceMode: FormControl<string | null>;
  rentNegotiable: FormControl<boolean | null>;
  apartmentFurnished: FormControl<boolean | null>;
  amenities: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-create-post',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss',
})
export class CreatePostDialogComponent implements OnInit {
  private store = inject(Store);
  readonly dialogRef = inject(MatDialogRef<CreatePostDialogComponent>);
  private destroy$ = new Subject<void>();

  createPostSuccess$: Observable<boolean> = this.store.select(
    selectCreatePostSuccess
  );
  createPostForm: FormGroup<ICreatePostForm>;
  selectedAmenities: string[] = [];
  amenitiesList: string[] = [
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
    'Club House',
  ];

  ngOnInit(): void {
    this.initForm();
    this.createPostSuccess$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res) {
        this.dialogRef.close();
        this.store.dispatch(loadRentPost());
      }
    });
  }

  initForm(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1400),
      ]),
      apartmentType: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      sharedProperty: new FormControl(true, [Validators.required]),
      location: new FormControl('', [Validators.required]),
      squareFit: new FormControl('', [Validators.required]),
      stayType: new FormControl('long term', [Validators.required]),
      rent: new FormControl('', [Validators.required]),
      priceMode: new FormControl('monthly', [Validators.required]),
      rentNegotiable: new FormControl(false),
      apartmentFurnished: new FormControl(true, [Validators.required]),
      amenities: new FormArray<FormControl<string>>([]),
    });
  }

  createNewPost(): void {
    const formValue = this.createPostForm.value;
    if (this.createPostForm.valid) {
      this.store.dispatch(
        createPost({ payload: { ...formValue, userId: 2, images: [] } })
      );
    }
  }

  onCheckboxChange(amenity: string, checked: boolean) {
    const amenities = this.createPostForm.get('amenities') as FormArray;
    if (checked) {
      amenities.push(new FormControl(amenity));
    } else {
      const index = amenities.controls.findIndex((x) => x.value === amenity);
      if (index >= 0) amenities.removeAt(index);
    }
  }

  isChecked(amenity: string): boolean {
    const amenities = this.createPostForm.get('amenities') as FormArray;
    return amenities.value.includes(amenity);
  }
}

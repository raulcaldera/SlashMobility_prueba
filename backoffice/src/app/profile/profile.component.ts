import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  formErrors = {
    'username': '',
    'email': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  file: string;

  constructor(
    private fb: FormBuilder,
    public imgDialog: MatDialog
  ) {}

  openImgDialog(): void {
    const dialogRef = this.imgDialog.open(ImgDialogComponent, {
      data: {file: this.file}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.file = result.replace("C:\\fakepath\\", "");
      console.log(this.file);
    });
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      bio: [''],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
    this.file =  "";
  }

  onSubmit() {
    const form = this.profileForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}